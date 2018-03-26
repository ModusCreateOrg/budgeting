import React from 'react';
import renderer from 'react-test-renderer';
import ItemDetailsTitle from '../';

const ItemDetailsTitleProps = {
  description: 'I am a transaction.',
  subtitle: 'is the 22% of the outflows',
  isNegative: true,
};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ItemDetailsTitle
        title={ItemDetailsTitleProps.description}
        subtitle={ItemDetailsTitleProps.subtitle}
        type={ItemDetailsTitleProps.isNegative}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
