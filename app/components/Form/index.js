// @flow
import * as React from 'react';
import provideContextBroadcast from 'utils/provideContextBroadcast';

type FormError = {
  _error: string,
  [fieldName: string]: string,
};

type FormValues = { [fieldName: string]: mixed };

type FormState = {
  values: FormValues,
  blurred: { [fieldName: string]: boolean },
};

type FormFieldData = {
  name: string,
  value: mixed,
  initialValue: mixed,
  blurred: boolean,
  error: string,
  onBlur: () => void,
  onChange: (value: mixed) => void,
};

export type FormData = {
  fields: { [fieldName: string]: FormFieldData },
  error: string,
  valid: boolean,
  initializeForm: (newValues: FormValues) => void,
  submitForm: () => void,
};

type FormProps = {
  children: React.Node,
  setBroadcastState: (newState: mixed) => void,
  fields: string[],
  initialValues: FormValues,
  onSubmit: (values: FormValues) => void,
  onSubmitSuccess: () => void,
  onSubmitFail: () => void,
  onFormDataChange: (formData: FormData) => void,
  validate: (values: FormValues, otherProps: Object) => FormError,
};

/**
 * Form component
 *
 * It renders a <form> element, handles all the form state, and provides
 * information and actions to the children components using context.
 *
 * It takes the following props:
 * - fields (required): Array of field names.
 * - initialValues:     Map of initial values.
 * - onSubmit:          Function to call on successful form submit.
 *                      If not provided, the submit logic can be handled in the
 *                      component.
 * - onSubmitSuccess:   Function to call when submit succeeded.
 * - onSubmitFail:      Function to call when submit failed.
 * - onFormDataChange:  Function to call with the form data when it changes.
 * - validate:          Function to validate the form on every change, if not
 *                      provided the form is always valid.
 *
 * The following props will be passed in a context Broadcast:
 * - fields:            Object with the value, blurred state, and errors for every field.
 *                      It also has function to attach the fields to the form state.
 * - error:             A generic error for the entire form (from the `_error` field returned
 *                      in the validation function).
 * - valid:             True is the form is valid.
 * - submitForm:        When called, the form will be validated and the provided 'onSubmit' function
 *                      will be called.
 * - initializeForm:    Initialize the form with the provided field values.
 *
 * To attach the form state to your form fields, you should use a component which takes form data
 * from the context Broadcast. (check `components/Field`)
 *
 */
export class Form extends React.Component<FormProps> {
  static defaultProps = {
    initialValues: {},
    onSubmit: null,
    onSubmitSuccess: null,
    onSubmitFail: null,
    onFormDataChange: null,
    validate: null,
  };

  constructor(props: FormProps) {
    super(props);

    const { initialValues } = props;

    // Initialize form state
    const initialFormState = this.getInitialFormState(initialValues);
    this.setFormState(initialFormState);
  }

  /**
   * Takes an object with form values and returns an initialized state
   * for the form.
   */
  getInitialFormState = (newValues: FormValues): FormState => {
    const { fields } = this.props;

    // make default values for every field not defined in `newValues`,
    // this is needed to use controlled components.
    const values = fields.reduce((result, field) => {
      const hasInitialValue = Object.keys(newValues).includes(field);
      result[field] = hasInitialValue ? newValues[field] : '';
      return result;
    }, {});

    // initialize 'blurred' as false for every field
    const blurred = fields.reduce((accumulator, field) => {
      accumulator[field] = false;
      return accumulator;
    }, {});

    return {
      values,
      blurred,
    };
  };

  /**
   * Return all props that are not used by the component
   */
  getOtherProps(): { [propName: string]: mixed } {
    const {
      fields,
      validate,
      children,
      setBroadcastState,
      initialValues,
      onFormDataChange,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail,
      ...otherProps
    } = this.props;
    return otherProps;
  }

  /**
   * Return a FormData object from the form state.
   *
   * It contains form information and handlers sorted by fields.
   * Meant to be used by other components.
   */
  getFormData = (): FormData => {
    const { fields, initialValues } = this.props;
    const { values, blurred } = this.formState;

    // validate form and get info about errors
    const errors = this.runValidator();
    const formError = errors._error || '';
    const isFormValid = Object.keys(errors).length === 0;

    const fieldsData = fields.reduce((accumulator, field) => {
      accumulator[field] = {
        name: field,
        value: values[field],
        initialValue: initialValues[field],
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

    return {
      fields: fieldsData,
      error: formError,
      valid: isFormValid,
      initializeForm: this.initializeForm,
      submitForm: this.submitForm,
    };
  };

  setFormState(newFormState: FormState): void {
    const { setBroadcastState } = this.props;

    // set form state
    this.formState = newFormState;

    // get form data and set it in the broadcast
    const formData = this.getFormData();
    setBroadcastState(formData);

    // if a handler exists, call it with form data
    if (this.props.onFormDataChange) {
      this.props.onFormDataChange(formData);
    }
  }

  formState: FormState;

  /**
   * Mark every field as blurred.
   *
   * This is called when the user tries to submit the form so that error messages
   * are visible for every field.
   */
  blurAll(): void {
    const { fields } = this.props;

    const allBlurred = fields.reduce((accumulator, field) => {
      accumulator[field] = true;
      return accumulator;
    }, {});

    this.setFormState({
      ...this.formState,
      blurred: allBlurred,
    });
  }

  /**
   * Handle blurring a form field.
   *
   * Sets `blurred` to true for the field.
   */
  handleBlur = (fieldName: string): void => {
    this.setFormState({
      ...this.formState,
      blurred: {
        ...this.formState.blurred,
        [fieldName]: true,
      },
    });
  };

  /**
   * Handle changing a form field.
   *
   * Sets the new field value.
   */
  handleChange = (fieldName: string, value: mixed): void => {
    this.setFormState({
      ...this.formState,
      values: {
        ...this.formState.values,
        [fieldName]: value,
      },
    });
  };

  /**
   * Initialize form state with the provided form values
   */
  initializeForm = (newValues: FormValues): void => {
    const initialFormState = this.getInitialFormState(newValues);
    this.setFormState(initialFormState);
  };

  /**
   * Checks if the form is valid, and then calls the provided `onSubmit` function.
   */
  submitForm = (event: ?SyntheticEvent<HTMLFormElement>): void => {
    const { onSubmit, onSubmitSuccess, onSubmitFail } = this.props;
    const { values } = this.formState;

    // If form submit was triggered by an event, call `preventDefault()`
    if (event) {
      event.preventDefault();
    }

    const errors = this.runValidator();
    const isFormValid = Object.keys(errors).length === 0;

    // mark all fields as blurred, that way errors can be shown in the UI
    this.blurAll();

    if (isFormValid && onSubmit) {
      onSubmit(values);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } else if (onSubmitFail) {
      onSubmitFail();
    }
  };

  /**
   * Runs the provided `validator`.
   *
   * Falls back to a default validator which always returns valid.
   *
   * (values, props) => {FormError}
   * A validator takes the current values and props, and returns an object
   * mapping every failing field to a string describing the error.
   *
   * A special `_error` key represents a generic error in the form.
   */
  runValidator(): FormError {
    const { validate } = this.props;
    const { values } = this.formState;

    const defaultValidator = () => ({});
    const validator = validate || defaultValidator;

    return validator(values, this.getOtherProps());
  }

  render() {
    return (
      <form onSubmit={this.submitForm} {...this.getOtherProps()}>
        {this.props.children}
      </form>
    );
  }
}

export default provideContextBroadcast('formData')(Form);
