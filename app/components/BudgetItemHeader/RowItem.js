// @flow
import * as React from 'react';
import styles from './style.scss';

type RowItemProps = {
  label: string,
  children: React.Element<any>,
};

const RowItem = ({ label, children }: RowItemProps) => (
  <div className={styles.rowItem}>
    <div className={styles.label}>{label} </div>
    <div className={styles.content}>{children} </div>
  </div>
);

export default RowItem;
