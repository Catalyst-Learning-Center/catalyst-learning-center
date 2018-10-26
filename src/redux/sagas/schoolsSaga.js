import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

// gets a list of schools from the database
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
    };//end error handling
};//end getSchools

function* schoolsSaga() {
    yield takeEvery('GET_SCHOOLS', getSchools);
};//end schoolSaga

export default schoolsSaga;