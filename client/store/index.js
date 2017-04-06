import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'modules/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(rootReducer), composeEnhancers(
  applyMiddleware(thunk)
));
export default store;

/**
 * Register async loaded reducers in store and replace
 * current state-reducer with the a new reducer
 *
 * @export
 * @param {Object} store - the store object
 * @param {Object} asyncReducer - async reducer modules
 */
let injected = [];
store.asyncReducers = {};

function replaceReducers(nextReducer) {
  const merged = Object.assign({}, nextReducer, store.asyncReducers);
  const combined = combineReducers(merged);
  store.replaceReducer(combined);
}

export function injectAsyncReducers(asyncReducers) {
  const newReducers = Object.keys(asyncReducers);
  const alreadyInjected = newReducers.every(reducer => injected.includes(reducer));

  // don't re-inject reducers that are already there
  if (alreadyInjected) {
    return;
  }

  // mark injected reducers (unique)
  injected = injected
    .concat(newReducers)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  store.asyncReducers = Object.assign({}, store.asyncReducers, asyncReducers);
  replaceReducers(rootReducer);
}


// hot reloading for reducers
if (module.hot) {
  module.hot.accept('../modules/rootReducer', () => {
    const nextReducer = require('../modules/rootReducer').default; // eslint-disable-line

    replaceReducers(nextReducer);
  });
}
