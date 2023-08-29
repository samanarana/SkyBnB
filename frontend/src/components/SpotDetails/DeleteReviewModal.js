// frontend/src/components/SpotDetails/DeleteReviewModal.js
import './DeleteReviewModal.css';


function DeleteReviewModal({ isOpen, setIsOpen, onDelete }) {
    if(!isOpen) return null;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setIsOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            handleClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="delete-review-modal">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this review?</p>
                <button className="button-to-yes" onClick={handleDelete}>Yes (Delete Review)</button>
                <button className="button-to-no" onClick={handleClose}>No (Keep Review)</button>
            </div>
        </div>
    );
}

export default DeleteReviewModal;
