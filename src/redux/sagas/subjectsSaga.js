import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getSubjects(action) {
    try {
        const subjectsResponse = yield call(Axios.get, '/subjects');
        const responseAction = {
            type: 'SET_SUBJECTS',
            payload: subjectsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get subjects error: ', error);
    }
}

function* subjectsSaga() {
    yield takeEvery('GET_SUBJECTS', getSubjects);
}

export default subjectsSaga;