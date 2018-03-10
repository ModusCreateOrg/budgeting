import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetGrid } from '../index';
import { MemoryRouter } from 'react-router-dom';

// mock nested component
jest.mock('components/BudgetGridRow');
jest.mock('containers/EntryFormRow');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetGrid />).toJSON();

  expect(tree).toMatchSnapshot();
});

it ('navigate to destination', () => {
  const mockHistory = {
    push: testId => testId
  }
  const tree = renderer.create(<BudgetGrid history={mockHistory} />);

  expect(tree.getInstance().navigateToDetailsPage('123')).toEqual('/budget/123')
})
