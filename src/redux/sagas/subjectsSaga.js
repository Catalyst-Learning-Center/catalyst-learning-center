import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getSubjects(action) {
    // gets a list of subjects from the database
    try {
        const subjectsResponse = yield call(Axios.get, '/subjects');
        const responseAction = {
            type: 'SET_SUBJECTS',
            payload: subjectsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get subjects error: ', error);
    };//end error handling
};//end getSubjects

function* subjectsSaga() {
    yield takeEvery('GET_SUBJECTS', getSubjects);
};//end subjectSaga

export default subjectsSaga;