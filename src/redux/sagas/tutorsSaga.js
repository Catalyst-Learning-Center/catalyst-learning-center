import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';

function* getTutors(action) {
    try {
        const tutorsResponse = yield call (Axios.get, '/tutors');
        const responseAction = {
            type: 'SET_TUTORS',
            payload: tutorsResponse.data,
        }
        yield put(responseAction);
    } catch (error) {
        console.log('get tutors error: ', error);
    }
}

function* toggleAdmin(action) {
    try {
        yield call(Axios.put, '/tutors/admin', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('toggle admin error: ', error);
    }
}

function* deleteTutor(action) {
    try {
        yield call(Axios.put, '/tutors/delete', action.payload);
    } catch (error) {
        console.log('delete tutor error: ', error);
    }
}

function* editTutor(action) {
    try {
        yield call(Axios.put, '/tutors/edit', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('edit tutor error: ', error);
    }
}

function* editTutorSubjects(action) {
    try {
        yield call(Axios.put, '/tutors/edit/subjects', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('edit tutor subjects error: ', error);
    }
}

function* editTutorLocations(action) {
    try {
        yield call(Axios.put, '/tutors/edit/locations', action.payload);
        yield put({type: 'GET_TUTORS'});
    } catch (error) {
        console.log('edit tutor locations error: ', error);
    }
}

function* tutorsSaga() {
    yield takeEvery('GET_TUTORS', getTutors);
    yield takeEvery('TOGGLE_ADMIN', toggleAdmin);
    yield takeEvery('DELETE_TUTOR', deleteTutor);
    yield takeEvery('EDIT_TUTOR', editTutor);
    yield takeEvery('EDIT_TUTOR_SUBJECTS', editTutorSubjects);
    yield takeEvery('EDIT_TUTOR_LOCATIONS', editTutorLocations);
}

export default tutorsSaga;