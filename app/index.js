// @flow
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'containers/App';
import store from 'store';

const renderApp = (Component: React.ComponentType<any>) => {
  const target = document.getElementById('root');
  if (!target) return;

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </React.Suspense>,
    target
  );
};

renderApp(App);
