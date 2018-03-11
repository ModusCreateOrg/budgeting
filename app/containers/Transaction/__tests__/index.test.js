import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Transaction } from '../index';

// mock nested component
jest.mock('components/NavLink', () => ({ to, label }) => <a href={to}>{label}</a>);
jest.mock('components/Transaction', () => ({ description, value }) => (
  <section>
    <h1>{description}</h1>
    <h2>{value}</h2>
  </section>
));

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Transaction transaction={{ description: 'Test', value: 10 }} balance={10} />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
