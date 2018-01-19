import React from 'react';
import renderer from 'react-test-renderer';
import RowItem from '../RowItem';

it('should render component correctly', () => {
  const label = 'Description';
  const value = 'New pair of shoes';

  const component = renderer.create(<RowItem label={label}> {value}</RowItem>).toJSON();
  expect(component).toMatchSnapshot();
});
