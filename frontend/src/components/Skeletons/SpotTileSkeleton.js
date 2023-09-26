import Skeleton from '@mui/material/Skeleton';

const SpotTileSkeleton = () => {
  return (
    <div className='spot-tile-skeleton'>
      <Skeleton variant="rectangular" width={'100%'} height={330} />
      <div className='spot-details-skeleton'>
        <Skeleton variant="text" width={'60%'} height={30} />
        <Skeleton variant="text" width={'40%'} height={30} />
      </div>
    </div>
  );
}

export default SpotTileSkeleton;
