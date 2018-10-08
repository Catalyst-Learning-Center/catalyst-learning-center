import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import sessions from './sessionsReducer';

//Lets make a bigger object for our store, with the objects from our reducers.
//This is why we get this.props.reduxStore.user.isLoading
const store = combineReducers({
  user,
  login,
  sessions,
});

export default store;
