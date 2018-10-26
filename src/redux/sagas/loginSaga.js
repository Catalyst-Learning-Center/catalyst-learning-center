import { put, takeLatest } from 'redux-saga/effects';
// component imports
import { LOGIN_ACTIONS } from '../actions/loginActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callLogin, callLogout } from '../requests/loginRequests';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    yield put({ type: LOGIN_ACTIONS.CLEAR_LOGIN_ERROR });
    // sets that we are starting an async request
    yield put({ type: LOGIN_ACTIONS.REQUEST_START });
    yield callLogin(action.payload);
    // sets that the async request is finished
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    yield put({
      type: USER_ACTIONS.FETCH_USER,
    });
  } catch (error) {
    // sets that the async request is finished
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    if (error.status === 401) {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED,
        message: error.message,
      });
    } else {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE,
        message: error.message,
      });
    };//end else if
  };//end error handling
};//end loginUser

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    yield callLogout(action);
    yield put({
      type: USER_ACTIONS.UNSET_USER,
    });
  } catch (error) {
    console.log('LOGOUT FAILED -- CHECK YOUR SERVER', error);
  };//end logoutUser
};//end logoutUser

function* loginSaga() {
  yield takeLatest(LOGIN_ACTIONS.LOGIN, loginUser);
  yield takeLatest(LOGIN_ACTIONS.LOGOUT, logoutUser);
};//end loginSaga

export default loginSaga;
