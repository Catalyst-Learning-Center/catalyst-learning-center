import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import sessionsSaga from './sessionsSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    sessionsSaga(),
    // watchIncrementAsync()
  ]);
}
