import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getLocations(action) {
    //this will handle GET requests to get the list of locations from the database
    try {
        const activeSessionsResponse = yield call(Axios.get, '/locations');
        const responseAction = {
            type: 'SET_LOCATIONS',
            payload: activeSessionsResponse.data
        }
        yield put(responseAction);
    } catch (error) {
        console.log('set active sessions error: ', error);
    };//end error handling
};//end getLocations

function* saveLocations(action) {
    //this handles making POST request to add a location to the database
    try {
        yield call(Axios.post, '/locations', action.payload);
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Location Added',
            content: 'Location successfully added!',
        }
        // confirmation alert
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
        // error alert
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    };//end error handling
};//end saveLocations

function* editLocations(action) {
    //this handles making PUT requests to edit the location in the database
    console.log('edit location with action: ', action);
    try {
        yield call(Axios.put, `/locations/edit/${action.payload.id}`, action.payload);
        let actionPayload = {
            open: true,
            dispatch: 'GET_LOCATIONS',
            title: 'Location Edited',
            content: 'Location successfully edited!',
        }
        // confirmation dialog
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
        // error alert
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    };//end error handling
};//end editLocations

function* toggleLocation(action) {
    //this handles making PUT request to toggle a location as active or inactive
    try {
        yield call(Axios.put, `/locations/status/${action.payload}`);
        yield put({ type: 'GET_LOCATIONS' });
    } catch (error) {
        console.log('toggle locations error: ', error);
    };//end error handling
};//end deactivateLocation

function* locationsSaga() {
    yield takeEvery('GET_LOCATIONS', getLocations);
    yield takeEvery('SAVE_LOCATIONS', saveLocations);
    yield takeEvery('MODIFY_LOCATIONS', editLocations);
    yield takeEvery('TOGGLE_LOCATIONS', toggleLocation);
};//end locationSaga

export default locationsSaga;