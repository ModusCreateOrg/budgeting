// @flow
import * as React from 'react';

import NavLink from 'components/NavLink';
import styles from './style.module.scss';

const ReportsTabbar = () => (
  <div className={styles.tabbar}>
    <NavLink to="/reports/inflow-outflow" label="Inflow vs Outflow" styles={styles} />
    <NavLink to="/reports/spending" label="Spending by Category" styles={styles} />
  </div>
);

export default ReportsTabbar;
