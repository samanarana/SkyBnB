// frontend/src/components/ManageSpots/index.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserSpotTileList from './UserSpotTileList';
import './ManageSpots.css';
import { useState } from 'react';
import { userSpotsThunk } from '../../store/spot';
import { useHistory } from 'react-router-dom';

import ManageSpotsSkeleton from '../Skeletons/ManageSpotsSkeleton';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        dispatch(userSpotsThunk()).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    const handleCreateNewSpotClick = () => {
        history.push('/create-spot');
    };

    return (
        <div className="manage-spots">
            {isLoading ? (
                <ManageSpotsSkeleton />
            ) : (
                <>
                    <h1>Manage Spots</h1>
                    <button className="manage-create-new-spot" onClick={handleCreateNewSpotClick}>Create a New Spot</button>
                    <div className="user-spots">
                        <UserSpotTileList />
                    </div>
                </>
            )}
        </div>
    );
}

export default ManageSpots;
