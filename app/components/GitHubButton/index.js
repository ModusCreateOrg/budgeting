import React, { Component, PropTypes } from 'react';

export default class GitHubButton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['Fork', 'Star']).isRequired,
    className: PropTypes.string,
    href: PropTypes.string.isRequired,
    dataIcon: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { type, className, href, dataIcon, ariaLabel } = this.props;

    return (
      <div className={className}>
        <a
          className="github-button"
          data-size="large"
          href={href}
          data-icon={dataIcon}
          data-show-count
          aria-label={ariaLabel}
        >
          {type}
        </a>
      </div>
    );
  }
}
