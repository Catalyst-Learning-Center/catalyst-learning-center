import { combineReducers } from 'redux';

// stores the location that a tutor is currently tutoring at
const location = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_LOCATION':
      return action.payload || state;
    default:
      return state;
  };//end switch
};//end location

// stores the grade of the student being tutored in the session
const grade = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_GRADE':
      return action.payload || state;
    case 'RESET_SESSION':
      return null;
    default:
      return state;
  };//end switch
};//end grade

// stores the school of the student being tutored in the session
const school = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_SCHOOL':
      return action.payload || state;
    case 'RESET_SESSION':
      return null;
    default:
      return state;
  };//end switch
};//end school

// stores the subject worked on with the student in the session
const subject = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION_SUBJECT':
      return action.payload || state;
    case 'RESET_SESSION':
      return null;
    default:
      return state;
  };//end switch
};//end subject

// stores the list of active sessions
const activeSessions = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SESSIONS':
      return action.payload || state;
    default:
      return state;
  };//end switch
};//end activeSessions

// stores the list of completed sessions
const completedSessions = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETED_SESSIONS':
      return action.payload || state;
    default:
      return state;
  };//end switch
};//end completedSessions

//make one object that has keys id, username, isLoading
export default combineReducers({
  location,
  grade,
  school,
  subject,
  activeSessions,
  completedSessions
});