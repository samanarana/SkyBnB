// frontend/src/components/ManageSpots/index.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTileList from '../SpotTileList/SpotTileList';
import './ManageSpots.css';
import { userSpotsThunk } from '../../store/spot';
import { useHistory } from 'react-router-dom';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSpots = useSelector((state) => state.spots?.userSpots || []);
    useEffect(() => {
        dispatch(userSpotsThunk());
    }, [dispatch]);

    const handleCreateNewSpotClick = () => {
        history.push('/create-spot');
    };

    return (
        <div className="manage-spots">
            <h1>Manage Spots</h1>
            <button className="manage-create-new-spot" onClick={handleCreateNewSpotClick}>Create a New Spot</button>
            <div className="user-spots">
                {userSpots.map((spot) => (
                    <div key={spot.id}>
                        <SpotTileList spot={spot} />
                        <div className="spot-actions">
                            <button className="update-spot">Update</button>
                            <button className="update-spot">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSpots;
