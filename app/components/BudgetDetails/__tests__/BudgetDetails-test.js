import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Connected, { BudgetDetails } from '../';

// mock nested components
jest.mock('../BackButton', () => 'div');
jest.mock('react-router-dom');

describe('Testing BudgetDetails...', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <BudgetDetails />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
