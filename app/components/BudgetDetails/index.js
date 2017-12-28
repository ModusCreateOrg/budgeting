// @flow

import * as React from 'react';
import PieChart from 'components/PieChart';
import styles from './style.scss';

type BudgetDetailProps = {
  itemPercentage: string,
  itemValue: string,
  itemTitle: string,
  isOutflow: boolean,
  goBack: () => void,
};

const BudgetDetails = ({ itemPercentage, itemValue, itemTitle, isOutflow, goBack }: BudgetDetailProps) => {
  const sign = isOutflow ? <span className={styles.negative}>-</span> : null;

  const pieData = [
    {
      value: parseFloat(itemPercentage),
      category: itemTitle,
      categoryId: '',
    },
    {
      value: 100 - parseFloat(itemPercentage),
      category: 'Others',
      categoryId: '',
    },
  ];

  return (
    <section>
      <span className={styles.back} onClick={goBack} role="presentation">
        {'<'} Back
      </span>
      <h1>
        {itemTitle} : ${itemValue}
      </h1>
      <h2>
        {sign}
        {itemPercentage}%
      </h2>
      <PieChart data={pieData} dataLabel="category" dataKey="category" isPercentage />
    </section>
  );
};

export default BudgetDetails;
