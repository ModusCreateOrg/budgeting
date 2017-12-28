import React from 'react';
import { shallow } from 'enzyme';
import Loading from 'components/Loading';
import Chunk from '../';

// mock 'load' function that resolves to a component
const LoadedComponent = () => <div>loaded</div>;
const mockLoad = async () => ({ default: LoadedComponent });

// mock nested component
jest.mock('components/Loading', () => () => <div>loading</div>);

it('renders the right component', async () => {
  // Render 'Chunk' with the mock 'load' function
  const wrapper = shallow(<Chunk load={mockLoad} />);

  // Initially, 'Chunk' should render the 'Loading' component
  expect(wrapper.contains(<Loading />)).toEqual(true);

  // when the mock function resolves, 'Chunk' should render the obtained component
  await mockLoad();

  // Breaking change introduced in Enzyme 3:
  // https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#for-mount-updates-are-sometimes-required-when-they-werent-before
  wrapper.update();
  expect(wrapper.contains(<LoadedComponent />)).toEqual(true);
});

it('passes the right props to the loaded component', async () => {
  // Render 'Chunk' with the mock 'load' function and a prop
  const wrapper = shallow(<Chunk load={mockLoad} foo="bar" />);

  await mockLoad();

  // Breaking change introduced in Enzyme 3:
  // https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#for-mount-updates-are-sometimes-required-when-they-werent-before
  wrapper.update();
  expect(wrapper.contains(<LoadedComponent foo="bar" />)).toEqual(true);
});
