import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fallbackComponent: PropTypes.func.isRequired,
    onError: PropTypes.func,
  };

  static defaultProps = {
    onError: null,
  };

  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      info: info,
    });

    // A callback can be used to log error messages
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    const { fallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error) {
      // Render error component
      return React.createElement(fallbackComponent, { error, info });
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
