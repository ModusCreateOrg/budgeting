// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.scss';

const TransactionNav = () => (
  <div className={styles.transaction__nav}>
    <Link to="/budget">Go back</Link>
  </div>
);

export default TransactionNav;
