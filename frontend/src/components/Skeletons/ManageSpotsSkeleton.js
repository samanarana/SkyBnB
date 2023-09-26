import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ManageSpotsSkeleton = () => {

    const SpotTileContent = () => {
        return (
            <div style={{ width: '24%', marginRight: '1%' }}> {/* Adjust width and margin as needed */}
                <Skeleton variant="rectangular" width={'100%'} height={330} />
                <div className='spot-details-skeleton'>
                    <Skeleton variant="text" width={'60%'} height={30} />
                    <Skeleton variant="text" width={'40%'} height={30} />
                </div>
            </div>
        );
    }

    return (
        <div className="manage-spots-skeleton">

            <Skeleton variant="text" width={'15%'} height={40} style={{borderRadius: '5px', margin: '40px 0 20px 50px'}} />

            <Skeleton variant="rectangular" width={'10%'} height={50} style={{borderRadius: '5px', marginLeft: '50px', marginBottom: '40px'}} />

            <div style={{ display: 'flex', width: '95%', marginLeft: '50px'}}>
                <SpotTileContent />
                <SpotTileContent />
                <SpotTileContent />
                <SpotTileContent />
            </div>
        </div>
    );
};

export default ManageSpotsSkeleton;
