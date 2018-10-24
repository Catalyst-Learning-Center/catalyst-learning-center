import { combineReducers } from 'redux';
// action imports
import { LOGIN_ACTIONS } from '../actions/loginActions';

//message holds the string that will display on the login screen if there's an error
const message = (state = '', action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.CLEAR_LOGIN_ERROR:
      return '';
    case LOGIN_ACTIONS.LOGIN_FAILED:
      return 'Ooops! The username and password didn\'t match. Try again!';
    case LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE:
      return 'Ooops! Something went wrong! Is the server running?';
    case LOGIN_ACTIONS.INPUT_ERROR:
      return action.payload;
    default:
      return state;
  };//end switch
};//end message

//isLoading holds the boolean that tracks whether or not this async call is out in the internet or not
const isLoading = (state = false, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.REQUEST_START:
      return true;
    case LOGIN_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  };//end switch
};//end isLoading

//make one object that has keys message, isLoading
export default combineReducers({
  isLoading,
  message,
});