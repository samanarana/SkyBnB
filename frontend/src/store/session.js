// frontend/src/store/session.js

import { csrfFetch } from './csrf';

//Action Types
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

//POJO Action Creators
export const setUser = user => ({
    type: SET_USER,
    payload: user
});

export const removeUser = () => ({
    type: REMOVE_USER
});


//Thunk Action Creator
export const login = (credential, password) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential, password })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return null;
    }
}


//Initial State
const initialState = { user: null };

//Reducer
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;
