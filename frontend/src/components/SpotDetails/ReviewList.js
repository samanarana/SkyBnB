// frontend/src/components/SpotDetails/Reviewlist.js

import { format, parseISO } from 'date-fns';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviewsThunk } from '../../store/review';
import './ReviewList.css';

import ReviewModal from './ReviewModal';

function ReviewList ({ spotId, ownerId }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const reviews = useSelector(state => state.review.reviews);
    const [avgRating, setAvgRating] = useState(0);

    const userId = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        let actualReviews = reviews;
        if (Array.isArray(reviews) && reviews.length === 1 && Array.isArray(reviews[0])) {
            actualReviews = reviews[0];
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
    }, [reviews]);

    if(!reviews) {
        return null;
    }

    return (
        <div className="review-list-container">
            <div className="review-header">
                { reviews.length === 0 ? "NEW" : <span className="big-star">★ {avgRating.toFixed(1)}</span> }
                <span className="review-count"> • {reviews.length} reviews</span>
            </div>

            {userId !== ownerId && (
            <button className="post-your-review-button" onClick={() => setIsOpen(true)}>Post Your Review</button>
            )}

            {reviews.length === 0 && userId !== ownerId && (
                <div className="be-the-first">
                    Be the first to post a review!
                </div>
            )}

            <ReviewModal spotId={spotId} isOpen={isOpen} setIsOpen={setIsOpen} />

            {reviews.map(review => (
            <div key={review.id} className="individual-review">
                <div className="review-author">
                {review.User.firstName}
                </div>
                <div className="review-date">
                {format(parseISO(review.createdAt), 'MMMM yyyy')}
                </div>
                <div className="review-content">
                {review.review}
                </div>
            </div>
            ))}
        </div>
    );
}

export default ReviewList;
