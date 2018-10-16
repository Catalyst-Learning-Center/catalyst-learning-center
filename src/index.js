import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './redux/reducers'; // imports ./redux/reducers/index.js
import 'typeface-roboto';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


import App from './App';
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js

// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// flag to only use the logger if in development mode
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
