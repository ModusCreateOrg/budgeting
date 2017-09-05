import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Field } from '../';

it('renders correctly', () => {
  const testFormData = {
    fields: {
      testFieldName: {
        value: 1234,
        onBlur: () => {},
      },
    },
  };

  const tree = renderer.create(<Field component="input" name="testFieldName" formData={testFormData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a custom component', () => {
  const testFormData = {
    fields: {
      testFieldName: {
        value: 1234,
        onBlur: () => {},
      },
    },
  };

  const CustomComponent = ({ name, value }) => <input type="text" name={name} value={value} />;

  const tree = renderer
    .create(<Field component={CustomComponent} name="testFieldName" formData={testFormData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should call onChange when the wrapped component changes', () => {
  const onChangeMock = jest.fn();

  const testFormData = {
    fields: {
      testFieldName: {
        value: 1234,
        onBlur: () => {},
        onChange: onChangeMock,
      },
    },
  };

  const wrapper = shallow(<Field name="testFieldName" formData={testFormData} />);
  wrapper.props().onChange('newValue');
  expect(onChangeMock.mock.calls).toEqual([['newValue']]);
});

it('should call onBlur when the wrapped component changes', () => {
  const onBlurMock = jest.fn();

  const testFormData = {
    fields: {
      testFieldName: {
        value: 1234,
        onBlur: onBlurMock,
      },
    },
  };

  const wrapper = shallow(<Field name="testFieldName" formData={testFormData} />);
  wrapper.props().onBlur();
  expect(onBlurMock.mock.calls).toEqual([[]]);
});
