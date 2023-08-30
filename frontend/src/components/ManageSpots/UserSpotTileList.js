// frontend/src/components/ManageSpots/UserSpotTileList.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userSpotsThunk } from '../../store/spot';
import UserSpotTile from './UserSpotTile';
import DeleteSpotModal from './DeleteSpotModal';


const UserSpotTileList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState(null);

  useEffect(() => {
    dispatch(userSpotsThunk());
  }, [dispatch]);


  const userSpots = useSelector((state) => state.spot?.userSpots || []);

  const openUpdateModal = (spotId) => {
    history.push(`/update-spot/${spotId}`);
  };

  const openDeleteModal = (spotId) => {
    setSelectedSpotId(spotId);
    setIsDeleteOpen(true);
  };

  return (
    <div className='user-spot-tile-list'>
        {isDeleteOpen && <DeleteSpotModal spotId={selectedSpotId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />}

        {userSpots.map(spot => (
            <div key={spot.id}>
            <UserSpotTile spot={spot} />
            <div className="spot-actions">
                <button className="update-spot" onClick={() => openUpdateModal(spot.id)}>Update</button>
                <button className="delete-spot" onClick={() => openDeleteModal(spot.id)}>Delete</button>
            </div>
            </div>
        ))}
    </div>
  );
};

export default UserSpotTileList;
