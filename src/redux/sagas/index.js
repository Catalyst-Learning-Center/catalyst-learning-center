import { all } from 'redux-saga/effects';
// component imports
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import sessionsSaga from './sessionsSaga';
import locationsSaga from './locationsSaga';
import gradesSaga from './gradesSaga';
import schoolsSaga from './schoolsSaga';
import subjectsSaga from './subjectsSaga';
import tutorsSaga from './tutorsSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    sessionsSaga(),
    locationsSaga(),
    gradesSaga(),
    schoolsSaga(),
    subjectsSaga(),
    tutorsSaga(),
    // watchIncrementAsync()
  ]);
};//end rootSaga
