// @flow
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as React from 'react';

// Using Hash router as HTML5 routing isn't supported in GitHub Pages.
// Otherwise, BrowserRouter is recommended
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'containers/App';
import store from 'store';

const renderApp = (Component: React.ComponentType<any>) => {
  const target = document.getElementById('root');
  if (!target) return;

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </Provider>,
    target
  );
};

renderApp(App);

// Hot Module Replacement API
if (module && module.hot && module.hot.accept) {
  module.hot.accept('containers/App', () => renderApp(App));
}
