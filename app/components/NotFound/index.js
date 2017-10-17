import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

export default class NotFound extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  render() {
    const { title, description } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  }
}
