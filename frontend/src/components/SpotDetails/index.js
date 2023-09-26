//frontend/src/components/SpotDetails/index.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { spotDetailsThunk } from '../../store/spot';
import { getAllReviewsThunk } from '../../store/review';
import './SpotDetails.css';

import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';

import SpotDetailSkeleton from '../Skeletons/SpotDetailSkeleton';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const spot = useSelector(state => state.spot.spotDetails);

    const [avgRating, setAvgRating] = useState(0);
    const reviews = useSelector(state => state.review.reviews);

    useEffect(() => {
        setLoading(true);
        dispatch(spotDetailsThunk(spotId))
        dispatch(getAllReviewsThunk(spotId))
        .then(() => setLoading(false))
    }, [dispatch, spotId]);

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            const totalStars = reviews.reduce((acc, review) => {
                return acc + (review.stars || 0);
            }, 0);

            const average = totalStars / reviews.length;
            setAvgRating(average);
        } else {
            setAvgRating(0);
        }
    }, [reviews]);

    if (loading) {
        return <SpotDetailSkeleton />;
    }

    if(!spot) {
        return null;
    }

    const spotImages = spot.SpotImages.map(img => img.url);

    return (
        <div className="spot-details-container">
            <div className="spot-title-location">
                <h2 className="spot-name">{spot.name}</h2>
                <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>
            </div>

            <div className="spot-images">
                <img className="main-image" src={spot.previewImage} alt={spot.name} />
                <div className="thumbnail-images">
                    {spotImages.map((imageURL, index) => (
                        <div className="thumbnail-wrapper" key={index}>
                        <img className="thumbnail" src={imageURL} alt={`${spot.name} - ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="spot-description-reserve-container">
                <div className="spot-host-description">
                    <p className="hosted-by">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                    <p className="description">{spot.description}</p>
                </div>
                <div className="callout-box">
                <div className="price-rating-container">
                    <p className="price">${spot.price} night</p>
                    <div className="spot-rating-spot-id-page">
                    {reviews.length === 0
                        ? <span className="big-star-box">★ NEW</span>
                        : <>
                            <span className="big-star-box">★ {avgRating.toFixed(1)}</span>
                            <span className="review-count-box"> • {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
                        </>
                    }
                    </div>
                    </div>
                <button className="reserve-button" onClick={() => alert('Feature coming soon')}>Reserve</button>
            </div>
            </div>

            <ReviewList spotId={spotId} ownerId={spot.ownerId} />

            <ReviewModal spotId={spotId} />
        </div>
    );
}

export default SpotDetails;
