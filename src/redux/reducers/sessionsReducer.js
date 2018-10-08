import { combineReducers } from 'redux';

const location = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_LOCATION':
      return action.payload || state;
    default:
      return state;
  }
};

const grade = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_GRADE':
      return action.payload || state;
    default:
      return state;
  }
};

const school = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_SCHOOL':
      return action.payload || state;
    default:
      return state;
  }
};

//make one object that has keys id, username, isLoading
export default combineReducers({
  location,
  grade
});