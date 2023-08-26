// frontend/src/components/SpotDetails/ReviewModal.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk } from '../../store/review';
import './ReviewModal.css';

function ReviewModal({ spotId, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
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
      spotId,
      rating,
      content,
    };

    await dispatch(createReviewThunk(reviewData));
    setIsOpen(false);
  };

  const toggleRating = (i) => {
    if (rating === i) {
      setRating(0);
    } else {
      setRating(i);
    }
  };

  const renderStars = () => {
    let starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
          onClick={() => toggleRating(i)}
        >
          {i <= rating ? "⭐" : "☆"}
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
