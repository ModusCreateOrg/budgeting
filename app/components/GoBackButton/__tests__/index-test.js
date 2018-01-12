import React from 'react';
import renderer from 'react-test-renderer';
import GoBackButton from '../';

it('renders correctly', () => {
  const tree = renderer.create(<GoBackButton onClick={() => null} />).toJSON();
  expect(tree).toMatchSnapshot();
});
