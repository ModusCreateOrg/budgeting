import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from '../';

jest.mock('components/Path', () => 'div');
jest.mock('components/Chart', () => 'div');

it('renders correctly', () => {
  const data = [
    {
      label: 'Label1',
      value: 50,
      fill: 'red',
    },
    {
      label: 'Label2',
      value: 100,
      fill: 'blue',
    },
  ];

  const tree = renderer.create(<PieChart data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
