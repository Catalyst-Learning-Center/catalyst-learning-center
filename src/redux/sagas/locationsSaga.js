import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getLocations(action) {
    //this will handle GET requests and pull data from server
    try {
        const activeSessionsResponse = yield call(Axios.get, '/locations');
        const responseAction = {
            type: 'SET_LOCATIONS',
            payload: activeSessionsResponse.data
        }
        yield put(responseAction);
    } catch (error) {
        console.log('set active sessions error: ', error);
    }//end error handling
}//end getLocations

function* saveLocations(action) {
    //this handles making POST requests and save data to server
    console.log('save location with action: ', action.payload);
    try {
        yield call(Axios.post, '/locations', action.payload);
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Location Added',
            content: 'Location successfully added!',
        }
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    } catch (error) {
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Error Adding Location',
            content: 'There was an error adding the location!',
        }
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    }//end error handling
}//end saveLocations

function* editLocations(action) {
    //this handles making PUT requests and edit data in the server
    console.log('edit location with action: ', action);
    try {
        yield call(Axios.put, `/locations/edit/${action.payload.id}`, action.payload);
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Location Edited',
            content: 'Location successfully edited!',
        }
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    } catch (error) {
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Error Editing Location',
            content: 'There was an error editing the location!',
        }
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    }//end error handling
}//end editLocations

function* toggleLocation(action) {
    //this handles making PUT request to toggle a location to true/false in the server
    try {
        yield call(Axios.put, `/locations/status/${action.payload}`);
        yield put({ type: 'GET_LOCATIONS' });
    } catch (error) {
        console.log('toggle locations error: ', error);
    }//end error handling
}//end deactivateLocation

function* locationsSaga() {
    yield takeEvery('GET_LOCATIONS', getLocations);
    yield takeEvery('SAVE_LOCATIONS', saveLocations);
    yield takeEvery('MODIFY_LOCATIONS', editLocations);
    yield takeEvery('TOGGLE_LOCATIONS', toggleLocation);
}//end locationSaga

export default locationsSaga;