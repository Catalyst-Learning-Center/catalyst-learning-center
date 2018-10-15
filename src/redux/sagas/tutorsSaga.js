import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getTutors(action) {
    try {
        const tutorsResponse = yield call (Axios.get, '/tutors');
        const responseAction = {
            type: 'SET_TUTORS',
            payload: tutorsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get tutors error: ', error);
    }
}

function* toggleAdmin(action) {
    try {
        yield call(Axios.put, '/tutors/admin', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('toggle admin error: ', error);
    }
}

function* tutorsSaga() {
    yield takeEvery('GET_TUTORS', getTutors);
    yield takeEvery('TOGGLE_ADMIN', toggleAdmin);
}

export default tutorsSaga;