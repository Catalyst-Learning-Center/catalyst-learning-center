import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

// gets list of grades from the database
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
    };//end error handling
};//end getGrades

function* gradesSaga() {
    yield takeEvery('GET_GRADES', getGrades);
};//end gradesSaga

export default gradesSaga;