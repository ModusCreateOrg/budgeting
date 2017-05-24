import React, { Component, PropTypes } from 'react';

// load github buttons js
let gitHubApiLoaded = false;
const insertGithubApi = () => {
  if (gitHubApiLoaded) {
    return;
  }

  const tagName = 'script';
  const target = document.getElementsByTagName(tagName)[0];
  const tag = document.createElement(tagName);
  tag.async = true;
  tag.src = 'https://buttons.github.io/buttons.js';
  target.parentNode.insertBefore(tag, target);
  gitHubApiLoaded = true;
};

const getHref = type => {
  const href = type === 'Fork' ? 'fork' : '';
  return `https:/github.com/ModusCreateOrg/budgeting-sample-app-webpack2/${href}`;
};

const getAriaLabel = type => `${type} ModusCreateOrg/budgeting-sample-app-webpack2 on GitHub`;
const getDataIcon = type => (type === 'Fork' ? 'octicon-repo-forked' : 'octicon-star');

export default class GitHubButton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['Fork', 'Star']).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  componentDidMount() {
    insertGithubApi();
  }

  render() {
    const { type, className } = this.props;
    return (
      <div className={className}>
        <a
          className="github-button"
          data-size="large"
          href={getHref(type)}
          data-icon={getDataIcon(type)}
          data-show-count
          aria-label={getAriaLabel(type)}
        >
          {type}
        </a>
      </div>
    );
  }
}
