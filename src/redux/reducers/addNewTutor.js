import { combineReducers } from 'redux';

const newTutorToAdd = (state={}, action) => {
    if (action.type === 'ADD_USER_FIRST_NAME') {
        return {...state, user_first_name: action.payload}
    } else if (action.type === 'ADD_USER_LAST_NAME') {
        return {...state, user_last_name: action.payload}
    } else if (action.type === 'ADD_USER_ADDRESS') {
        return {...state, user_address: action.payload}
    } else if (action.type === 'ADD_USER_CITY') {
        return {...state, user_city: action.payload}
    } else if (action.type === 'ADD_USER_STATE') {
        return {...state, user_state: action.payload}
    } else if (action.type === 'ADD_USER_ZIPCODE') {
        return {...state, user_zipcode: action.payload}
    } else if (action.type === 'ADD_USER_CELL_PHONE') {
        return {...state, user_cell_phone: action.payload}
    } else if (action.type === 'ADD_USER_EMAIL') {
        return {...state, user_email: action.payload}
    } else if (action.type === 'ADD_USER_QUALIFICATIONS') {
        return {...state, user_qualifications: action.payload}
    } else if (action.type === 'ADD_USER_EXPERIENCE') {
        return {...state, user_experience: action.payload}
    } else if (action.type === 'ADD_USER_AGE_GROUP') {
        return {...state, user_age_group: action.payload}
    } else if (action.type === 'ADD_USER_RESUME') {
        return {...state, resume: action.payload}
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
            resume: '',
        });
    }
    return state
}

export default combineReducers({
    newTutorToAdd,
})