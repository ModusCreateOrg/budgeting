import React from 'react';
import renderer from 'react-test-renderer';
import GoBack from '../';

it('renders correctly', () => {
  const tree = renderer.create(<GoBack text="← Back" goBack={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
