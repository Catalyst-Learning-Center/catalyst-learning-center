import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getSchools(action) {
    try {
        const schoolsResponse = yield call(Axios.get, '/schools');
        const responseAction = {
            type: 'SET_SCHOOLS',
            payload: schoolsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get schools error: ', error);
    }
}

function* schoolsSaga() {
    yield takeEvery('GET_SCHOOLS', getSchools);
}

export default schoolsSaga;