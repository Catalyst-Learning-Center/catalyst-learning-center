import { combineReducers } from 'redux';
// component imports
import user from './userReducer';
import login from './loginReducer';
import sessions from './sessionsReducer';
import pendingApplications from './applicationsReducer';
import locations from './locationsReducer';
import grades from './gradesReducer';
import schools from './schoolsReducer';
import subjects from './subjectsReducer';
import tutors from './tutorsReducer';
import newTutorToAdd from './addNewTutor';
import alert from './alertReducer';

//Lets make a bigger object for our store, with the objects from our reducers.
//This is why we get this.props.reduxStore.user.isLoading
const store = combineReducers({
  user,
  login,
  sessions,
  pendingApplications,
  locations,
  grades,
  schools,
  subjects,
  tutors,
  newTutorToAdd,
  alert
});

export default store;