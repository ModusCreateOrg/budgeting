// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavLink from 'components/NavLink';
import GitHubButton from 'components/GitHubButton';
import Logo from './Logo';
import styles from './style.scss';

export default () => (
  <div className={styles.header}>
    <Switch>
      <Route path="/item/:itemId">
        <NavLink to="/budget" label="Back to Budget" styles={styles} />
      </Route>
      <Route
        render={() => [
          <NavLink key="budget" to="/budget" label="Budget" styles={styles} />,
          <NavLink key="reports" to="/reports" label="Reports" styles={styles} />,
        ]}
      />
    </Switch>
    <GitHubButton className={styles.gitHubButton} type="Star" />
    <GitHubButton className={styles.gitHubButton} type="Fork" />
    <Logo />
  </div>
);
