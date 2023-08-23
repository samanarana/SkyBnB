// frontend/src/components/SpotTileList/SpotTileList.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsThunk } from '../../store/spot';
import SpotTile from './SpotTile';


const SpotTileList = () => {
    const dispatch = useDispatch();

    //fetch all the spots when component mounts
    useEffect(() => {
        dispatch(allSpotsThunk());
    }, [dispatch]);

    //get spots data from redux state
    const spots = useSelector(state => state.spot.allSpots) || [];

    return (
        <div className='spot-tile-list'>
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    );
}

export default SpotTileList;
