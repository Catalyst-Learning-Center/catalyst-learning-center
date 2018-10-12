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

function* getCompletedSessions(action) {
    try {
        const completedSessionsResponse = yield call(Axios.get, '/sessions/completed');
        const responseAction = {
            type: 'SET_COMPLETED_SESSIONS',
            payload: completedSessionsResponse.data
        }
        yield console.log('hello');
        yield put(responseAction);
    } catch (error) {
        console.log('set active sessions error: ', error);
    }
}

function* postNewSession(action) {
    try {
        yield call(Axios.post, '/sessions', action.payload);
        yield put({type: 'GET_ACTIVE_SESSIONS'});
    } catch(error) {
        console.log('post new session error: ', error);
    }
}

function* endSession(action) {
    try {
        yield call(Axios.put, '/sessions', action.payload);
        yield put({type: 'GET_ACTIVE_SESSIONS'});
        yield put({type: 'GET_COMPLETED_SESSIONS'});
    } catch(error) {
        console.log('end session error: ', error);
    }
}

function* sessionsSaga() {
    yield takeEvery('GET_ACTIVE_SESSIONS', getActiveSessions);
    yield takeEvery('GET_COMPLETED_SESSIONS', getCompletedSessions);
    yield takeEvery('POST_NEW_SESSION', postNewSession);
    yield takeEvery('END_SESSION', endSession);
}

export default sessionsSaga;