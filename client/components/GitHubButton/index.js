import React, { PropTypes } from 'react';

const getHref = type => {
  const href = type === 'Fork' ? 'fork' : '';
  return `https:/github.com/ModusCreateOrg/budgeting-sample-app-webpack2/${href}`;
};

const getAriaLabel = type => `${type} ModusCreateOrg/budgeting-sample-app-webpack2 on GitHub`;
const getDataIcon = type => (type === 'Fork' ? 'octicon-repo-forked' : 'octicon-star');

const GitHubButton = ({ type, className }) => (
  <div className={className}>
    <a
      className="github-button"
      data-style="mega"
      href={getHref(type)}
      data-icon={getDataIcon(type)}
      data-show-count={true}
      aria-label={getAriaLabel(type)}
    >
      {type}
    </a>
  </div>
);

GitHubButton.propTypes = {
  type: PropTypes.oneOf(['Fork', 'Star']).isRequired,
  className: PropTypes.string,
};

GitHubButton.defaultProps = {
  className: '',
};

export default GitHubButton;
