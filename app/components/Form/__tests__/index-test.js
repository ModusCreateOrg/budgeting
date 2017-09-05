import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Form } from '../';

it('renders correctly', () => {
  const testFields = ['testField'];

  const tree = renderer.create(<Form fields={testFields} setBroadcastState={jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with children', () => {
  const testFields = ['testField'];

  const tree = renderer
    .create(
      <Form fields={testFields} setBroadcastState={jest.fn()}>
        <input type="text" />
      </Form>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should return form data to onFormDataChange handler', () => {
  const testFields = ['testField'];
  const handleFormDataChange = jest.fn(formData => {
    const fieldData = formData.fields.testField;
    expect(fieldData.name).toEqual('testField');
    expect(fieldData.blurred).toEqual(false);

    expect(formData.valid).toEqual(true);
  });

  shallow(<Form fields={testFields} setBroadcastState={jest.fn()} onFormDataChange={handleFormDataChange} />);

  expect(handleFormDataChange.mock.calls.length).toEqual(1);
});

it('errors should be returned in form data', () => {
  const testFields = ['testField'];
  const validator = () => ({
    testField: 'some error here',
  });
  const handleFormDataChange = jest.fn(formData => {
    const fieldData = formData.fields.testField;
    expect(fieldData.error).toEqual('some error here');

    expect(formData.valid).toEqual(false);
  });

  shallow(
    <Form
      fields={testFields}
      setBroadcastState={jest.fn()}
      onFormDataChange={handleFormDataChange}
      validate={validator}
    />
  );

  expect(handleFormDataChange.mock.calls.length).toEqual(1);
});

it('onSubmitSuccess should be called correctly', () => {
  const testFields = ['testField'];

  let formSubmited = false;
  let formData = null;
  const handleFormDataChange = newFormData => {
    formData = newFormData;

    // submit form on the first time we get form data
    if (!formSubmited) {
      formSubmited = true;
      formData.submitForm();
    }
  };

  const handleSubmit = jest.fn();
  const handleSubmitSuccess = jest.fn();
  const handleSubmitFail = jest.fn();

  shallow(
    <Form
      fields={testFields}
      setBroadcastState={jest.fn()}
      onFormDataChange={handleFormDataChange}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // handleSubmit & handleSubmit should be called
  expect(handleSubmit.mock.calls.length).toEqual(1);
  expect(handleSubmitSuccess.mock.calls.length).toEqual(1);
  expect(handleSubmitFail.mock.calls.length).toEqual(0);

  // fields should be blurred after submit attempt
  expect(formData.fields.testField.blurred).toEqual(true);
});

it('onSubmitFail should be called correctly', () => {
  const testFields = ['testField'];

  let formSubmited = false;
  let formData = null;
  const handleFormDataChange = newFormData => {
    formData = newFormData;

    // submit form on the first time we get form data
    if (!formSubmited) {
      formSubmited = true;
      formData.submitForm();
    }
  };

  const failingValidator = () => ({
    testField: 'some error here',
  });

  const handleSubmit = jest.fn();
  const handleSubmitSuccess = jest.fn();
  const handleSubmitFail = jest.fn();

  shallow(
    <Form
      fields={testFields}
      setBroadcastState={jest.fn()}
      onFormDataChange={handleFormDataChange}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      validate={failingValidator}
    />
  );

  // handleSubmitFail should be called
  expect(handleSubmit.mock.calls.length).toEqual(0);
  expect(handleSubmitSuccess.mock.calls.length).toEqual(0);
  expect(handleSubmitFail.mock.calls.length).toEqual(1);

  // fields should be blurred after submit attempt
  expect(formData.fields.testField.blurred).toEqual(true);
});

it('form data should be updated after a field changes', () => {
  const testFields = ['testField'];

  let formData = null;
  const handleFormDataChange = newFormData => {
    formData = newFormData;
  };

  shallow(<Form fields={testFields} setBroadcastState={jest.fn()} onFormDataChange={handleFormDataChange} />);

  // trigger a field change
  let fieldData = formData.fields.testField;
  fieldData.onChange('newValue');

  // form data should be updated
  fieldData = formData.fields.testField;
  expect(fieldData.value).toEqual('newValue');
});

it('form data should be updated after a field blurs', () => {
  const testFields = ['testField'];

  let formData = null;
  const handleFormDataChange = newFormData => {
    formData = newFormData;
  };

  shallow(<Form fields={testFields} setBroadcastState={jest.fn()} onFormDataChange={handleFormDataChange} />);

  // trigger a field change
  let fieldData = formData.fields.testField;
  fieldData.onBlur();

  // form data should be updated
  fieldData = formData.fields.testField;
  expect(fieldData.blurred).toEqual(true);
});
