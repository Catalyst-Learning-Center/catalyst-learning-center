import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getTutors(action) {
    // gets a list of tutors from the database
    try {
        const tutorsResponse = yield call (Axios.get, '/tutors');
        const responseAction = {
            type: 'SET_TUTORS',
            payload: tutorsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get tutors error: ', error);
    };//end error handling
};//end getTutors

function* toggleAdmin(action) {
    // toggles a tutor between admin and tutor status
    try {
        yield call(Axios.put, '/tutors/admin', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('toggle admin error: ', error);
    };//end error handling
};//end toggleAdmin

function* deleteTutor(action) {
    // switches a tutor to inactive
    try {
        yield call(Axios.put, '/tutors/delete', action.payload);
    } catch (error) {
        console.log('delete tutor error: ', error);
    };//end error handling
};//end deleteTutor

function* editTutor(action) {
    // edits information about the tutor
    try {
        yield call(Axios.put, '/tutors/edit', action.payload);
        let actionPayload = {
            open: true,
            dispatch: 'GET_TUTORS',
            title: 'Tutor Edited',
            content: 'Tutor successfully edited!',
        }
        // confirmation dialog
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    } catch (error) {
        let actionPayload = {
            open: true,
            dispatch: 'GET_TUTORS',
            title: 'Error Editing Tutor',
            content: 'There was an error editing the tutor!',
        }
        // error dialog
        yield put({
            type: 'OPEN_ALERT',
            payload: actionPayload
        });
    };//end error handling
};//end editTutor

function* editTutorSubjects(action) {
    // edits tutor's selected subjects
    try {
        yield call(Axios.put, '/tutors/edit/subjects', action.payload);
    } catch (error) {
        console.log('edit tutor subjects error: ', error);
    };//end error handling
};//end editTutorSubjects

function* editTutorLocations(action) {
    // edits a tutor's selected locations
    try {
        yield call(Axios.put, '/tutors/edit/locations', action.payload);
    } catch (error) {
        console.log('edit tutor locations error: ', error);
    };//end error handling
};//end editTutorLocations

function* tutorsSaga() {
    yield takeEvery('GET_TUTORS', getTutors);
    yield takeEvery('TOGGLE_ADMIN', toggleAdmin);
    yield takeEvery('DELETE_TUTOR', deleteTutor);
    yield takeEvery('EDIT_TUTOR', editTutor);
    yield takeEvery('EDIT_TUTOR_SUBJECTS', editTutorSubjects);
    yield takeEvery('EDIT_TUTOR_LOCATIONS', editTutorLocations);
};//end tutorSaga

export default tutorsSaga;