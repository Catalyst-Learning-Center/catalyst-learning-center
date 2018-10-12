import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getGrades() {
    try {
        const gradesResponse = yield call(Axios.get, '/grades');
        const responseActoin = {
            type: 'SET_GRADES',
            payload: gradesResponse.data,
        }
        yield put(responseActoin);
    } catch(error) {
        console.log('get grades error: ', error);
    }
}

function* gradesSaga() {
    yield takeEvery('GET_GRADES', getGrades);
}

export default gradesSaga;