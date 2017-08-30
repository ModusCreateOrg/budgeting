import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';

/**
 * Returns a HOC you can use to enable a component as a form.
 *
 * It handles all the form state, and provides information and actions to
 * the wrapped component.
 *
 * It takes a configuration object with the following options:
 * - fields (required): Array of field names.
 * - initialValues:     Map of initial values.
 * - onSubmit:          Function to call on successful form submit.
 *                      If not provided, the submit logic can be handled in the
 *                      component.
 * - validate:          Function to validate the form on every change, if not
 *                      provided the form is always valid.
 *
 * Note that all the configuration options can also be passed as props to your
 * component at runtime, this can be useful when the form depends on dynamic data.
 *
 * The following props will be passed to the wrapped component:
 * - fields:            Object with the value, blurred state, and errors for every field.
 *                      It also has function to attach the fields to the form state.
 * - error:             A generic error for the entire form (from the `_error` field returned
 *                      in the validation function).
 * - valid:             True is the form is valid.
 * - handleSubmit:      When called, the form will be validated and the provided 'onSubmit' function
 *                      will be called.
 * - initializeForm:    Initialize the form with the provided field values.
 *
 * To attach the form state to your form fields, you should use the `fields` prop,
 * it contains handlers for blur and change. Note that it won't work with regular form elements
 * like `<input>` or `<select>` because the `onChange` functions passed by the HOC expects a value,
 * not an event (as returned by the form elements). So, form input abstractions must be used,
 * and they have to implement a way to return a value on change (check `components/Field`).
 */
const createForm = config => WrappedComponent => {
  class CreateForm extends React.Component {
    static propTypes = {
      fields: PropTypes.array,
      initialValues: PropTypes.object,
      onSubmit: PropTypes.func,
      validate: PropTypes.func,
    };

    static defaultProps = {
      fields: null,
      initialValues: null,
      onSubmit: null,
      validate: null,
    };

    constructor(props) {
      super(props);

      const { fields, initialValues, onSubmit, validate } = props;

      // Initial configuration can be passed in the HOC or as props.
      // Here they are merged.
      this.initialValues = initialValues || config.initialValues || {};
      this.fields = fields || config.fields || [];
      this.onSubmit = onSubmit || config.onSubmit;
      this.validate = validate || config.validate;

      // Initialize form
      this.state = this.getInitialFormState(this.initialValues);
    }

    /**
     * Takes an object with form values and returns an initialized state
     * for the form.
     */
    getInitialFormState = newValues => {
      // make default values for every field not defined in `newValues`,
      // this is needed to use controlled components.
      const values = this.fields.reduce((result, field) => {
        const hasInitialValue = Object.keys(newValues).includes(field);
        result[field] = hasInitialValue ? newValues[field] : '';
        return result;
      }, {});

      // initialize 'blurred' as false for every field
      const blurred = this.fields.reduce((accumulator, field) => {
        accumulator[field] = false;
        return accumulator;
      }, {});

      return {
        values,
        blurred,
      };
    };

    /**
     * Return all props that are not used by the HOC
     */
    getOtherProps() {
      const { fields, initialValues, onSubmit, validate, ...otherProps } = this.props;
      return otherProps;
    }

    /**
     * Initialize form state with the provided form values
     */
    initializeForm = newValues => {
      const formState = this.getInitialFormState(newValues);
      this.setState(formState);
    };

    /**
     * Mark every field as blurred.
     *
     * This is called when the user tries to submit the form so that error messages
     * are visible for every field.
     */
    blurAll = () => {
      const allBlurred = this.fields.reduce((accumulator, field) => {
        accumulator[field] = true;
        return accumulator;
      }, {});

      this.setState(state => ({
        ...state,
        blurred: allBlurred,
      }));
    };

    /**
     * Handle blurring a form field.
     *
     * Sets `blurred` to true for the field.
     */
    handleBlur = fieldName => {
      this.setState(state => ({
        ...state,
        blurred: {
          ...state.blurred,
          [fieldName]: true,
        },
      }));
    };

    /**
     * Handle changing a form field.
     *
     * Sets the new field value.
     */
    handleChange = (fieldName, value) => {
      this.setState(state => ({
        ...state,
        values: {
          ...state.values,
          [fieldName]: value,
        },
      }));
    };

    /**
     * Handle submitting the form.
     *
     * Checks if the form is valid, and then calls the provided `onSubmit` function.
     * Returns true if the submit was valid.
     */
    handleSubmit = () => {
      const { values } = this.state;

      const errors = this.runValidator();
      const isFormValid = Object.keys(errors).length === 0;

      // mark all fields as blurred, that way errors can be shown in the UI
      this.blurAll();

      if (isFormValid && this.onSubmit) {
        this.onSubmit(values);
        return true;
      }
      return false;
    };

    /**
     * Runs the provided `validator`.
     *
     * Falls back to a default validator which always returns valid.
     *
     * (values, props) => {ErrorObject}
     * A validator takes the current values and props, and returns an object
     * mapping every failing field to a string describing the error.
     *
     * A special `_error` key represents a generic error in the form.
     */
    runValidator() {
      const { values } = this.state;

      const defaultValidator = () => ({});
      const validator = this.validate ? this.validate : defaultValidator;

      return validator(values, this.getOtherProps());
    }

    render() {
      const { values, blurred } = this.state;

      // validate form and get info about errors
      const errors = this.runValidator();
      const formError = errors._error || '';
      const isFormValid = Object.keys(errors).length === 0;

      // form data to pass to the wrapped component
      const fieldsData = this.fields.reduce((accumulator, field) => {
        accumulator[field] = {
          name: field,
          value: values[field],
          initialValue: this.initialValues[field],
          blurred: blurred[field],
          error: errors[field] || '',
          onBlur: () => {
            this.handleBlur(field);
          },
          onChange: value => {
            this.handleChange(field, value);
          },
        };
        return accumulator;
      }, {});

      return (
        <WrappedComponent
          fields={fieldsData}
          error={formError}
          valid={isFormValid}
          handleSubmit={this.handleSubmit}
          initializeForm={this.initializeForm}
          {...this.getOtherProps()}
        />
      );
    }
  }

  CreateForm.displayName = `CreateForm(${getDisplayName(WrappedComponent)})`;
  return CreateForm;
};

// Props passed to the wrapped component by 'createForm'
export const formPropTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
};

export default createForm;
