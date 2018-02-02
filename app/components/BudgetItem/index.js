// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import DonutChart from 'components/DonutChart';

import styles from './style.scss';

type BudgetItemProps = {
  info: Object,
  data: any,
};

const BudgetItem = ({ info, data }: BudgetItemProps) => (
  <div className={styles.budgetItem}>
    <Link to="/budget/">Back</Link>
    <h2 className={styles.budgetItemTitle}>{info.title}</h2>
    <h4 className={styles.budgetItemSubTitle}>
      <span className={info.isNegative ? styles.outflowItem : styles.inflowItem}>
        {info.isNegative ? '-' : '+'}
        {info.percentage.toFixed(2)}%
      </span>
      Budget Contribution
    </h4>
    <DonutChart data={data} dataLabel="description" dataKey="key" />
  </div>
);

export default BudgetItem;
