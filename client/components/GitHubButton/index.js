import React, { PropTypes } from 'react';

const getDataCountApi = type => {
  const hash = type === 'Fork' ? 'forks' : 'stargazers';
  return `/repos/ModusCreateOrg/budgeting-sample-app-webpack2#${hash}_count`;
};

const getDataCountHref = type => {
  const href = type === 'Fork' ? 'network' : 'stargazers';
  return `/ModusCreateOrg/budgeting-sample-app-webpack2/${href}`;
};

const getDataCountAriaLabel = type => `# ${type === 'Fork' ? 'forks' : 'stargazers'} on GitHub`;
const getAriaLabel = type => `${type} ModusCreateOrg/budgeting-sample-app-webpack2 on GitHub`;
const getDataIcon = type => (type === 'Fork' ? 'octicon-repo-forked' : 'octicon-star');

const GitHubButton = ({ type, className }) => (
  <div className={className}>
    <a
      className="github-button"
      data-style="mega"
      href="https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2"
      data-icon={getDataIcon(type)}
      data-count-href={getDataCountHref(type)}
      data-count-api={getDataCountApi(type)}
      data-count-aria-label={getDataCountAriaLabel(type)}
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
