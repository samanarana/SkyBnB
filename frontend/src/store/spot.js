// frontend/src/store/spot.js
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
//const GET_SPOT_DETAILS = 'spots/getSpotDetails'

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots,
    };
};
//test

export const allSpotsThunk = () => async (dispatch) => {
 const response = await csrfFetch('/api/spots');
 if (response.ok) {
    const spotsObj = await response.json();
    const spotsArray = Object.values(spotsObj);
    dispatch(getAllSpots(spotsArray));
 }
}


const initialState = [];


const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return action.spots;
        default:
            return state;
    }
};

export default spotReducer;
