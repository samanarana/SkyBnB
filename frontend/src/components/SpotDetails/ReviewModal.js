// frontend/src/components/SpotDetails/ReviewModal.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/review';
import './ReviewModal.css';

function ReviewModal({ spotId, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const modalRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, [setIsOpen, modalRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      spotId: Number(spotId),
      stars: rating,
      review: content
    };

    const error = await dispatch(createReviewThunk(reviewData));


    if (error) {
      setErrorMessage(error);
    } else {
      setIsOpen(false);
    }
  };

  const toggleRating = (i) => {
    if (rating === i) {
      setRating(0);
    } else {
      setRating(i);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setContent('');
      setRating(0);
      setHoverRating(0);
      setErrorMessage(null);
    }
  }, [isOpen]);

  const [hoverRating, setHoverRating] = useState(0);

  const renderStars = () => {
    let starArray = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating);
      starArray.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : 'empty'}`}
          onClick={() => toggleRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          {isFilled ? "⭐" : "☆"}
        </span>
      );
    }
    return starArray;
  };
  const isButtonDisabled = content.length < 10 || rating === 0;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal">
            <h1>How was your stay?</h1>

            {errorMessage && <div className="error-message-review">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <label>
                <textarea
                  placeholder="Leave your review here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </label>
              <div className="star-rating">
                {renderStars()}
                <span className="star-label">Stars</span>
              </div>
              <button type="submit" disabled={isButtonDisabled}>
                Submit Your Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );

}

export default ReviewModal;
