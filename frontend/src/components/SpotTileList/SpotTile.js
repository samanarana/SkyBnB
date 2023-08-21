// frontend/src/components/SpotTileList/SpotTile.js

import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './SpotTile.css';

const SpotTile = ({ spot }) => {
    const history = useHistory();
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleTileClick = () => {
        history.push(`/spots/${spot.id}`);
    };

    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className='spot-tile' onClick={handleTileClick}>
            <img
               src={spot.thumbnailUrl}
               alt={`${spot.name}`}
               onMouseMove={handleMouseMove}
            />
            <div className="tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>{spot.name}</div>
            <div className="spot-details">
                <div>
                    <div className='spot-location'>{`${spot.city}, ${spot.state}`}</div>
                    <div className='spot-price'>{`$ ${spot.price} / night`}</div>
                </div>
                <div className='spot-rating'>
                    ★ {spot.avgRating || 'New'}
                </div>
            </div>
        </div>
    );
}

export default SpotTile;
