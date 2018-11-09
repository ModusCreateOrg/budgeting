import React from 'react';
import renderer from 'react-test-renderer';
import ManagedSwitch from '..';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const ChildComponent = () => <div>working</div>;

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = null;

beforeEach(() => {
  store = mockStore({});
});

it('renders a component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <ManagedSwitch>
            <ChildComponent />
          </ManagedSwitch>
        </MemoryRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('sets location on the store', () => {
  const expectedLocation = { pathname: '/test', search: '?testing=true', hash: '' };

  renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/test', search: 'testing=true' }]}>
        <ManagedSwitch>
          <ChildComponent />
        </ManagedSwitch>
      </MemoryRouter>
    </Provider>
  );

  const action = store.getActions()[0];
  expect(action.type).toBe('location/SET_LOCATION');
  expect(action.location.pathname).toBe(expectedLocation.pathname);
});
