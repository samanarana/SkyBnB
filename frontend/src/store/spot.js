// frontend/src/store/spot.js
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_USER_SPOTS = 'spots/getUserSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

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

export const getUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots,
    };
};

export const updateSpot = (updatedSpot) => {
    return {
        type: UPDATE_SPOT,
        updatedSpot,
    };
};

export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
    };
};


// Thunks
export const allSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spotsObj = await response.json();
        const spotsArray = spotsObj.Spots;
        dispatch(getAllSpots(spotsArray));
 }
};

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
};

export const createSpotThunk = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(createSpot(data));
        return data;
      } else {
        if (data.errors) {
          return { errors: data.errors };
      }
    }
};

export const userSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const spotsObj = await response.json();
        const spotsArray = spotsObj.Spots;
        console.log('Received spots in Thunk:', spotsArray);
        dispatch(getUserSpots(spotsArray));
    }
};

export const updateSpotThunk = (spotId, updatedData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (response.ok) {
        dispatch(updateSpot(data));
        return data;
    }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
        return { message: 'Spot deleted successfully!' };
    } else {
        const data = await response.json();
        if (data.errors) {
            return { errors: data.errors };
        }
    }
};


const initialState = {
    allSpots: [],
    userSpots: [],
    spotDetails: null,
};


const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return {
                ...state,
                allSpots: action.spots
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
        case GET_USER_SPOTS:
            return {
                ...state,
                userSpots: action.spots
            };
            case UPDATE_SPOT:
                return {
                ...state,
                allSpots: state.allSpots.map((spot) =>
                    spot.id === action.updatedSpot.id ? action.updatedSpot : spot
                ),
            };
            case DELETE_SPOT:
            return {
                ...state,
                allSpots: state.allSpots.filter((spot) => spot.id !== action.spotId),
                userSpots: state.userSpots.filter((spot) => spot.id !== action.spotId),
            };
        default:
            return state;
    }
};

export default spotReducer;
