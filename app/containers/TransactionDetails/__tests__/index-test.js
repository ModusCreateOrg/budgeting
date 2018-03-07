import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { defaultTransactions, inflowCategories } from 'modules/defaults';
import TransactionDetails from '../index';

// mock nested component
jest.mock('components/DonutChart');

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('renders correctly', () => {
  const store = mockStore({ transactions: [...defaultTransactions], categories: [...inflowCategories] });
  const matchMockObj = { params: { id: 1 }, isExact: true, path: '', url: '' };
  const tree = renderer
    .create(
      <Provider store={store}>
        <TransactionDetails match={matchMockObj} />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
