// frontend/src/components/SpotDetails/Reviewlist.js

import { format, parse as parseDate } from 'date-fns';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviewsThunk, deleteReviewThunk } from '../../store/review';
import DeleteReviewModal from './DeleteReviewModal';
import './ReviewList.css';

import ReviewModal from './ReviewModal';

function ReviewList ({ spotId, ownerId }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const reviews = useSelector(state => state.review.reviews);
    const [avgRating, setAvgRating] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [hasPostedReview, setHasPostedReview] = useState(false);

    const user = useSelector(state => state.session.user);
    const userId = user ? user.id : null;

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        let actualReviews = reviews;
        if (Array.isArray(reviews) && reviews.length === 1 && Array.isArray(reviews[0])) {
            actualReviews = reviews[0];
        }

        if (actualReviews && userId) {
            setHasPostedReview(actualReviews.some(review => review.userId === userId));
        }

        if (actualReviews && actualReviews.length > 0) {
            const totalStars = actualReviews.reduce((acc, review) => {
                return acc + (review.stars || 0);
            }, 0);

            const average = totalStars / actualReviews.length;
            setAvgRating(average);
        } else {
            setAvgRating(0);
        }
    }, [reviews, userId]);

    if(!reviews) {
        return null;
    }

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId));
    };

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="review-list-container">
            <div className="review-header">
            {reviews.length === 0
                ? <span className="big-star">★ NEW</span>
                : <>
                    <span className="big-star">★ {avgRating.toFixed(1)}</span>
                    <span className="review-count"> • {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
                </>
            }
            </div>

            {(userId || userId === 0) && userId !== ownerId && !hasPostedReview && (
            <button className="post-your-review-button" onClick={() => setIsOpen(true)}>Post Your Review</button>
            )}

            {reviews.length === 0 && userId !== ownerId && (
                <div className="be-the-first">
                    Be the first to post a review!
                </div>
            )}

            <ReviewModal spotId={spotId} isOpen={isOpen} setIsOpen={setIsOpen} />

            <DeleteReviewModal
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                onDelete={() => handleDeleteReview(currentReviewId)}
                />
            {sortedReviews.map(review => (
            <div key={review.id} className="individual-review">
                <div className="review-author">{review.User?.firstName}</div>
                <div className="review-date">
                {review.createdAt
                    ? format(parseDate(review.createdAt, "yyyy-MM-dd HH:mm:ss", new Date()), 'MMMM yyyy')
                    : 'Invalid date'
                }
                </div>
                <div className="review-content">{review.review}</div>
                {review.userId === userId && (
                    <button className="button-delete-review" onClick={() => {
                        setCurrentReviewId(review.id);
                        setIsDeleteModalOpen(true);
                      }}>Delete</button>
                )}
            </div>
            ))}
        </div>
    );
}

export default ReviewList;
