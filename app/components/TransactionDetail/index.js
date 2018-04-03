// @flow
import * as React from 'react';
import styles from './styles.scss';

type TransactionDetail = {
  description: string,
  category: string,
  percentage: string,
  isPositive: boolean,
};

const Legend = ({ description, category, percentage, isPositive }: TransactionDetail) => (
  <div className={isPositive ? styles.isPositive : styles.isNegative}>
    <h1>{description}</h1>
    <h2>{category}</h2>
    <h3>{`${isPositive ? '+' : '-'} ${percentage}`}</h3>
  </div>
);

export default Legend;
