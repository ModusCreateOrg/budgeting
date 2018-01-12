import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { getTransactionContributionById } from 'selectors/transactions';
import { ItemContribution } from '../';

jest.mock('components/ContributionCard', () => 'ContributionCard');
jest.mock('components/GoBackButton', () => 'GoBackButton');

const transaction = {
  id: 1,
  categoryId: 1,
  description: 'Test transaction',
  value: 1000,
};

const mockStore = {
  subscribe: () => null,
  dispatch: () => null,
  getState: () => ({
    transactions: [transaction],
  }),
};

const mockContribution = getTransactionContributionById(mockStore.getState(), 1);

describe('ItemContribution', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ItemContribution contribution={mockContribution} store={mockStore} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should goto back', () => {
    const props = {
      contribution: mockContribution,
      store: mockStore,
      history: {
        goBack: jest.fn(),
      },
    };

    const instance = shallow(<ItemContribution {...props} />).instance();
    instance.goBack();
    expect(props.history.goBack).toHaveBeenCalled();
  });
});
