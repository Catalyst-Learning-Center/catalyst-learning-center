import { combineReducers } from 'redux';

// stores a list of locations
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
    };//switch
};//end locations

// stores edited info for a location before sending it to the database
const editedLocation = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_LOCATION':
            return action.payload || state;
        default:
            return state;
    };//end switch
};//end editedLocation

export default combineReducers({
    locations,
    editedLocation
});