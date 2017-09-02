// @flow
import * as React from 'react';

import NavLink from 'components/NavLink';
import GitHubButton from 'components/GitHubButton';
import Logo from './Logo';
import styles from './style.scss';

export default () => (
  <div className={styles.header}>
    <NavLink to="/budget" label="Budget" styles={styles} />
    <NavLink to="/reports" label="Reports" styles={styles} />
    <GitHubButton className={styles.gitHubButton} type="Star" />
    <GitHubButton className={styles.gitHubButton} type="Fork" />
    <Logo />
  </div>
);
