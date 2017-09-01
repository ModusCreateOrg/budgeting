import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';

/**
 * Returns a HOC you can use to enable a component to receive form data
 * from a form data broadcaster in context.
 */
const createFormField = WrappedComponent => {
  class CreateFormField extends React.Component {
    static contextTypes = {
      formDataBroadcast: PropTypes.object,
    };

    state = {
      formData: {},
    };

    componentWillMount() {
      const { formDataBroadcast } = this.context;

      // set initial data from the form data broadcast
      const initialFormData = formDataBroadcast.getState();
      this.updateFieldState(initialFormData);
    }

    componentDidMount() {
      const { formDataBroadcast } = this.context;

      // subscribe to the form data broadcast
      this.unsubscribe = formDataBroadcast.subscribe(this.updateFieldState);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    updateFieldState = formData => {
      this.setState({ formData: formData });
    };

    render() {
      const { formData } = this.state;

      return <WrappedComponent formData={formData} {...this.props} />;
    }
  }

  CreateFormField.displayName = `CreateFormField(${getDisplayName(WrappedComponent)})`;
  return CreateFormField;
};

export default createFormField;
