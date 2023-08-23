// frontend/src/store/spot.js
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpot';

//action creators
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

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot,
    };
};

// Thunks
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
    } else {
        const data = await response.json();
        if (data.errors) {
          return { errors: data.errors };
    }
}
}

export const createSpotThunk = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createSpot(data.spot));
        return {};
      } else {
        const data = await response.json();
        if (data.errors) {
          return { errors: data.errors };
        }
      }
};


const initialState = {
    allSpots: [],
    spotDetails: null,
};


const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return {
                ...state,
                allSpots: Object.values(action.spots)
            };
        case GET_SPOT_DETAILS:
            return {
                ...state,
                spotDetails: action.spot
            };
        case CREATE_SPOT:
            return {
                ...state,
                allSpots: [...state.allSpots, action.spot],
            };
        default:
            return state;
    }
};

export default spotReducer;