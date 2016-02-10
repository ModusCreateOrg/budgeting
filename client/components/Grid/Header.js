import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static childContextTypes = {
    header: PropTypes.bool
  };

  getChildContext() {
    return {
      header: true
    };
  }

  render() {
    const { children } = this.props;
    return (
      <thead>{children}</thead>
    );
  }
}
