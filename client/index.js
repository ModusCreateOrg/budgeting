import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'containers/App';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
    	<App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
