import { combineReducers } from 'redux';

// stores info about a new tutor before it is added to the system
const newTutorToAdd = (state={}, action) => {
    if (action.type === 'EDIT_TUTOR') {
        // runs when a tutor's info is edited
        return {...state, [action.payload.name]: action.payload.value}
    } else if (action.type === 'ADD_TUTOR') {
        // runs when importing data from an application
        return action.payload
    } else if (action.type === 'RESET_STATE') {
        // resets stored info
        return (state = {
            user_first_name: '',
            user_last_name: '',
            user_address: '',
            user_city: '',
            user_state: '',
            user_zipcode: '',
            user_cell_phone: '',
            user_email: '',
            user_qualifications: '',
            user_experience: '',
            user_age_group: '',
            user_subjects: '',
            user_location: '',
            resume: '',
            username: '',
            password: '',
        });
    };//end else if
    return state
};//end newTutorToAdd

// stores a new tutor's selected subjects before being sent to the database
const newTutorSubjects = (state=[], action) => {
    if (action.type === 'ADD_TUTOR_SUBJECTS') {
        // runs when importing data from an application
        return action.payload;
    } else if (action.type === 'CHECK_SUBJECT') {
        // runs when a subject checkbox is checked
        return [...state, action.payload];
    } else if (action.type === 'UNCHECK_SUBJECT') {
        // runs when a subject checkbox is unchecked -- removes that subject
        return state.filter((id) => id !== action.payload);
    };//end else if
    return state;
};//end newTutorSubjects

// stores a new tutor's selected locations before being sent to the database
const newTutorLocations = (state=[], action) => {
    if (action.type === 'ADD_TUTOR_LOCATIONS') {
        // runs when importing data from an application
        return action.payload;
    }else if (action.type === 'CHECK_LOCATION') {
        // runs when a location checkbox is checked
        return [...state, action.payload];
    } else if (action.type === 'UNCHECK_LOCATION') {
        // runs when a location checkbox is unchecked -- removes that subject
        return state.filter((id) => id !== action.payload);
    };//else if
    return state;
};//end newTutorLocations

export default combineReducers({
    newTutorToAdd,
    newTutorLocations,
    newTutorSubjects,
});