// frontend/src/components/SpotTileList/SpotTileList.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotsThunk } from '../../store/spot';
import SpotTile from './SpotTile';

import SpotTileSkeleton from '../Skeletons/SpotTileSkeleton';


const SpotTileList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    //fetch all the spots when component mounts
    useEffect(() => {
        setLoading(true);

        dispatch(allSpotsThunk())
        .then(() => {
            setLoading(false);
        })
    }, [dispatch]);

    //get spots data from redux state
    const spots = useSelector(state => state.spot.allSpots) || [];

    return (
        <div className='spot-tile-list'>
            {loading ? (
                <>
                    <SpotTileSkeleton />
                    <SpotTileSkeleton />
                    <SpotTileSkeleton />
                    <SpotTileSkeleton />
                    <SpotTileSkeleton />
                </>
            ) : (
            spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))
        )}
    </div>
    );
}

export default SpotTileList;
