// frontend/src/store/spot.js
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails'

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots,
    };
};

export const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot,
    };
};

export const allSpotsThunk = () => async (dispatch) => {
 const response = await csrfFetch('/api/spots');
 if (response.ok) {
    const spotsObj = await response.json();
    const spotsArray = Object.values(spotsObj);
    dispatch(getAllSpots(spotsArray));
 }
}

export const spotDetailsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotDetails(spot));
    }
}


const initialState = {
    allSpots: [],
    spotDetails: null,
};


const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return action.spots;
        case GET_SPOT_DETAILS:
            return {
                ...state,
                spotDetails: action.spot
            };
        default:
            return state;
    }
};

export default spotReducer;
