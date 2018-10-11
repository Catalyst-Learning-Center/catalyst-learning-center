import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getActiveSessions(action) {
    try {
        const activeSessionsResponse = yield call(Axios.get, '/sessions/active');
        const responseAction = {
            type: 'SET_ACTIVE_SESSIONS',
            payload: activeSessionsResponse.data
        }
        yield console.log('hello');
        yield put(responseAction);
    } catch (error) {
        console.log('set active sessions error: ', error);
    }

}

function* sessionsSaga() {
    yield takeEvery('GET_ACTIVE_SESSIONS', getActiveSessions);
    // yield takeLatest(LOGIN_ACTIONS.LOGOUT, logoutUser);
}

export default sessionsSaga;