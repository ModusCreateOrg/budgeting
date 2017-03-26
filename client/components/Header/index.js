import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import Logo from './Logo';
import GitHubButton from '../GitHubButton';
import styles from './style.scss';

const NavLink = ({ to, label }) => (
  <Route
    to={to}
    exact
    children={({ location: { pathname } }) =>
      <Link to={to} className={`${styles.navLink} ${pathname === to ? styles.selected : ''}`}>{ label }</Link>
    }
  />
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default () => (
  <div className={styles.header}>
    <NavLink to="/budget" label="Budget" />
    <NavLink to="/reports" label="Reports" />
    <GitHubButton className={styles.gitHubButton} type="Star" />
    <GitHubButton className={styles.gitHubButton} type="Fork" />
    <Logo />
  </div>
);
