// frontend/src/components/Skeletons/SpotDetailsSkeleton.js
import Skeleton from '@mui/material/Skeleton';

const SpotDetailsSkeleton = () => {
    return (
      <div className="spot-details-container">

        {/* Title and Location */}
        <div className="spot-title-location">
          <Skeleton variant="text" width={250} height={50} style={{ margin: '10px 0 0 0' }}/>
          <Skeleton variant="text" width={150} height={40} />
        </div>

        {/* Main Image */}
        <div className="spot-images">
          <Skeleton variant="rectangular" width={450} height={300} style={{ margin: '0 20px 0 0' }}/>

          {/* Thumbnails */}
          <div className="thumbnail-images">
            <Skeleton variant="rectangular" width={250} height={144} />
            <Skeleton variant="rectangular" width={250} height={144} />
            <Skeleton variant="rectangular" width={250} height={144} />
            <Skeleton variant="rectangular" width={250} height={144} />
          </div>
        </div>

        {/* Description and Reserve container */}
        <div className="spot-description-reserve-container">

          {/* Hosted by and Description */}
          <div className="spot-host-description">
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="text" width={400} height={20} />
            <Skeleton variant="text" width={400} height={20} />
            <Skeleton variant="text" width={400} height={20} />
          </div>

          {/* Price and Ratings */}
          <div className="callout-box">
            <div className="price-rating-container">
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={150} height={20} />
            </div>

            {/* Reserve Button */}
            <Skeleton variant="rectangular" width={'90%'} height={40} style={{ margin: '20px 0 0 0' }} />
          </div>
        </div>

        {/* Separator */}
        <Skeleton variant="text" width={'100%'} height={20} style={{ margin: '10px 0 0 0' }} />

        {/* ReviewModal */}
        <Skeleton variant="text" width={300} height={50} style={{ margin: '-20px 0 0 0' }}/>

        {/* ReviewList */}
        <Skeleton variant="text" width={150} height={30} style={{ margin: '-10px 0 0 0' }}/>
        <Skeleton variant="text" width={100} height={30} style={{ margin: '-40px 0 0 0' }}/>
        <Skeleton variant="text" width={"100%"} height={30} style={{ margin: '-40px 0 0 0' }}/>

      </div>
    );
  };

  export default SpotDetailsSkeleton;
