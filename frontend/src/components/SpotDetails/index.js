//frontend/src/components/SpotDetails/index.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { spotDetailsThunk } from '../../store/spot';
import './SpotDetails.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spot.spotDetails);

    useEffect(() => {
        dispatch(spotDetailsThunk(spotId));
    }, [dispatch, spotId]);

    if(!spot) {
        return null;
    }

    return (
        <div className="spot-details-container">
            <div className="spot-title-location">
                <h2 className="spot-name">{spot.name}</h2>
                <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>
            </div>

            <div className="spot-images">
                <img className="main-image" src={spot.previewImage} alt={spot.name} />
                <div className="thumbnail-images">
                    <img className="thumbnail" src={spot.image1} alt={`${spot.name} - 1`} />
                    <img className="thumbnail" src={spot.image2} alt={`${spot.name} - 2`} />
                    <img className="thumbnail" src={spot.image3} alt={`${spot.name} - 3`} />
                    <img className="thumbnail" src={spot.image4} alt={`${spot.name} - 4`} />
                </div>
            </div>

            <div className="spot-description-reserve-container">
                <div className="spot-host-description">
                    <p className="hosted-by">Hosted by {spot.hostFirstName} {spot.hostLastName}</p>
                    <p className="description">{spot.description}</p>
                </div>
                <div className="callout-box">
                    <div className="price-rating-container">
                        <p className="price">${spot.price} night</p>
                        <div className="spot-rating-spot-id-page">
                        ★ {spot.avgRating || 'New'}
                        </div>
                    </div>
                <button className="reserve-button" onClick={() => alert('Feature coming soon')}>Reserve</button>
            </div>
            </div>
        </div>
    );
}

export default SpotDetails;