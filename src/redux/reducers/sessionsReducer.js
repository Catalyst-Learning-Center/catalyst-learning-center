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

const subject = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_SUBJECT':
      return action.payload || state;
    default:
      return state;
  }
};

const activeSessions = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SESSIONS':
      return action.payload || state;
    default:
      return state;
  }
};

const completedSessions = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETED_SESSIONS':
      return action.payload || state;
    default:
      return state;
  }
};

//make one object that has keys id, username, isLoading
export default combineReducers({
  location,
  grade,
  school,
  subject,
  activeSessions,
  completedSessions
});