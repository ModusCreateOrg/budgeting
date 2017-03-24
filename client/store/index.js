import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'modules/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;

// hot reloading for reducers
if (module.hot) {
  module.hot.accept('../modules/rootReducer', () => {
    const nextReducer = require('../modules/rootReducer').default; // eslint-disable-line

    store.replaceReducer(nextReducer);
  });
}
