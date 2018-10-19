import { combineReducers } from 'redux';

const newTutorToAdd = (state={user_state: 'MN'}, action) => {
    if (action.type === 'EDIT_TUTOR') {
        return {...state, [action.payload.name]: action.payload.value}
    } else if (action.type === 'ADD_TUTOR') {
        return action.payload
    } else if (action.type === 'RESET_STATE') {
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
            // add locations and subjects
            resume: '',
        });
    }
    return state
}

const newTutorSubjects = (state=[], action) => {
    if (action.type === 'ADD_TUTOR_SUBJECTS') {
        return action.payload;
    }
    return state;
}

const newTutorLocations = (state=[], action) => {
    if (action.type === 'ADD_TUTOR_SUBJECTS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    newTutorToAdd,
    newTutorLocations,
    newTutorSubjects
})