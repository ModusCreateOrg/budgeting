import React from 'react';
import renderer from 'react-test-renderer';
import Balance from '../';

it('renders correctly', () => {
  const mockAmount = {
    text: 'text',
    isNegative: false,
  };
  const tree = renderer.create(<Balance title="title" amount={mockAmount} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a prefix', () => {
  const mockAmount = {
    text: 'text',
    isNegative: false,
  };
  const tree = renderer.create(<Balance title="title" amount={mockAmount} prefix="prefix" />).toJSON();
  expect(tree).toMatchSnapshot();
});
