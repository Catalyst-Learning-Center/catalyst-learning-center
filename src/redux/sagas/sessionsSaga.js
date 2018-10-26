import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
// component imports
import EditSessionDialog from '../../components/SessionsPage/EditSessionDialog';

function* getActiveSessions(action) {
    // gets active sessions from the database
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
    };//end error handling
};//end getActiveSessions

function* getCompletedSessions(action) {
    // gets completed sessions from the database
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
    };//end error handling
};//end getCompletedSessions

function* postNewSession(action) {
    // adds a new session to the database
    try {
        yield call(Axios.post, '/sessions', action.payload);
        yield put({type: 'GET_ACTIVE_SESSIONS'});
    } catch(error) {
        console.log('post new session error: ', error);
    };//end postNewSessions
};//end postNewSession

function* endSession(action) {
    // edits the session to add an end time and mark as complete
    try {
        yield call(Axios.put, '/sessions', action.payload);
        yield put({type: 'GET_ACTIVE_SESSIONS'});
        yield put({type: 'GET_COMPLETED_SESSIONS'});
    } catch(error) {
        console.log('end session error: ', error);
    };//end error handling
};//end endSession

function* editSession(action) {
    // edits a completed session
    try {
        yield call(Axios.put, '/sessions/edit', action.payload);
        yield put({type: 'GET_COMPLETED_SESSIONS'});
    } catch(error) {
        console.log('edit session error: ', error);
    };//end error handling
};//end editSession

function* sessionsSaga() {
    yield takeEvery('GET_ACTIVE_SESSIONS', getActiveSessions);
    yield takeEvery('GET_COMPLETED_SESSIONS', getCompletedSessions);
    yield takeEvery('POST_NEW_SESSION', postNewSession);
    yield takeEvery('END_SESSION', endSession);
    yield takeEvery('EDIT_SESSION', editSession);
};//end sessionSaga

export default sessionsSaga;