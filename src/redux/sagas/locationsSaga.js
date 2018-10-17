import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getLocations(action) {
    try {
        const activeSessionsResponse = yield call(Axios.get, '/locations');
        const responseAction = {
            type: 'SET_LOCATIONS',
            payload: activeSessionsResponse.data
        }
        yield put(responseAction);
    } catch (error) {
        console.log('set active sessions error: ', error);
    }
}

function* saveLocations(action) {
    try {
        const locationSaveResponse = yield call(Axios.post, '/locations', action.payload);
        const responseAction = {
            type: 'SAVE_LOCATIONS',
            payload: locationSaveResponse.data
        }
        yield put(responseAction);
    } catch (error) {
        console.log('save locations error: ', error);  
    }
}

function* locationsSaga() {
    yield takeEvery('GET_LOCATIONS', getLocations);
    yield takeEvery('S')
}

export default locationsSaga;