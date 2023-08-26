// frontend/src/store/review.js

import { csrfFetch } from "./csrf";

// Action Types
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const GET_ONE_REVIEW = 'review/getOneReview';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// Action Creators
export const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews,
    };
};

export const getOneReview = (review) => {
    return {
        type: GET_ONE_REVIEW,
        review,
    };
};

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review,
    };
};

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
    };
};


// Thunks
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        console.log("Fetched reviews in Thunk: ", reviews);
        dispatch(getAllReviews(reviews.Reviews));
    }
};

export const getOneReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`);
    if (response.ok) {
        const review = await response.json();
        dispatch(getOneReview(review));
    }
};

export const createReviewThunk = (reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${reviewData.spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};


// Initial State
const initialState = {
    reviews: [],
    avgRating: 0,
};


// Reducer
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews,
            };
        case GET_ONE_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.review]
            };
        case CREATE_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.review]
            };
        case DELETE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.reviewId)
            };
        default:
            return state;
    }
}

export default reviewReducer;
