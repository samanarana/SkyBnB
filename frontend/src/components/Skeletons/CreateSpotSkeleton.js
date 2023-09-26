import Skeleton from '@mui/material/Skeleton';

const CreateSpotSkeleton = () => {
  return (
    <div className="create-spot-form-page create-spot-form-skeleton">

      {/* Form Title */}
      <Skeleton variant="text" className="create-spot-heading" width="40%" style={{ textAlign: 'left', marginTop: '3rem', marginBottom: '2rem' }}/>

      {/* Form Fields */}
      <div className="form-section">

        {/* Basic Info */}
        <div className="basic-info">
          <Skeleton variant="text" width="40%" style={{ marginBottom: '2rem',  marginLeft: '30%', marginRight: '30%' }} />
          <Skeleton variant="text" width="98%" style={{ marginBottom: '2rem' }} />
          <Skeleton variant="text" width="98%" style={{ marginBottom: '2rem' }} />
        </div>

        {/* Address Info */}
        <div className="address-info">
          <Skeleton variant="text" width="98%" style={{ marginBottom: '2rem' }} />
          <Skeleton variant="text" width="98%" style={{ marginBottom: '2rem' }} />
        </div>

        {/* Description */}
        <div className="description-section">
          <Skeleton variant="text" width="100%" height="8rem" style={{ marginBottom: '2rem' }} />
        </div>

        {/* Images */}
        <div className="images-section">
          <Skeleton variant="rectangular" width="98%" height={100} style={{ marginBottom: '2rem' }} />
          <Skeleton variant="rectangular" width="98%" height={100} style={{ marginBottom: '2rem' }} />
        </div>

        {/* Submit Button */}
        <Skeleton variant="rectangular" className="submit-spot-button" />

      </div>
    </div>
  );
};

export default CreateSpotSkeleton;
