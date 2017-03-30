import React, { Component, PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

import styles from './style.scss';

const NavLink = ({ to, label }) => (
  <Route
    to={to}
    exact
    children={({ location: { pathname } }) =>
      <Link to={to} className={`${styles.navLink} ${pathname.indexOf(to) !== -1 ? styles.selected : ''}`}>{ label }</Link>
    }
  />
);

class ReportsTabbar extends Component {
  render() {
    return (
      <section className={styles.reports}>
        <div className={styles.tabbar}>
          <NavLink to="/reports/inflow-outflow" label="Inflow vs Outflow" />
          <NavLink to="/reports/spending" label="Spending by Category" />
        </div>
      </section>
    );
  }
}

export default ReportsTabbar;
