// frontend/src/components/ManageSpots/DeleteSpotModal.js

import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css';

function DeleteSpotModal({ isOpen, setIsOpen }) {
    const { closeModal } = useModal();
  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteSpot = async () => {
    const result = await dispatch(deleteSpotThunk(spotId));
    if (!result.errors) {
        closeModal();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-spot-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <button className="button-to-yes" onClick={handleDeleteSpot}>Yes (Delete Spot)</button>
        <button className="button-to-no" onClick={closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
