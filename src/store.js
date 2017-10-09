import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';


import globalReducer from './global-reducer';
import globalSagas from './global-sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware,
];

let middlewareApplied = applyMiddleware(...middlewares);

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    middlewareApplied = compose(middlewareApplied, devToolsExtension());
  }
}

const store = createStore(
  globalReducer,
  middlewareApplied,
);

sagaMiddleware.run(globalSagas);

export default store;
