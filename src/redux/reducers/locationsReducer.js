import { combineReducers } from 'redux';

const locations = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCATIONS':
            return action.payload || state;
        case 'ADD_LOCATIONS':
            return [...state, action.payload];
        case 'REMOVE_LOCATIONS':
            return state.filter((id) => id !== action.payload);
        default:
            return state;
    }
};

const editedLocation = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_LOCATION':
            return action.payload || state;
        default:
            return state;
    }
};


export default combineReducers({
    locations,
    editedLocation
  });