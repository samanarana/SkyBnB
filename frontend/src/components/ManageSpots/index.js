// frontend/src/components/ManageSpots/index.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserSpotTileList from './UserSpotTileList';
import './ManageSpots.css';
import { userSpotsThunk } from '../../store/spot';
import { useHistory } from 'react-router-dom';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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
                        <UserSpotTileList />
                </div>
        </div>
    );
};

export default ManageSpots;
