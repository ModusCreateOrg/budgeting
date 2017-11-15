// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';

import { Route, Link } from 'react-router-dom';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type BugdetDetailsProps = {
  transaction: Transaction,
  contribution: Object,
};

const BudgetItem = ({ transaction, contribution }: BugdetDetailsProps) => {
  const chartData = [
    {
      value: parseFloat(contribution.percent),
      label: 'This',
    },
    {
      value: 100 - parseFloat(contribution.percent),
      label: 'Total',
    },
  ];
  return (
    <section>
      <Route>
        <Link to="/budget">Back</Link>
      </Route>
      <h1>
        {transaction.description}
        &nbsp;({formatAmount(transaction.value).text})
      </h1>
      <h3>
        <span className={transaction.value < 0 ? styles.redText : styles.greenText}>
          {transaction.value > 0 ? '+' : '-'}
        </span>
        {formatAmount(contribution.percent, false, true).text}
      </h3>
      <DonutChart data={chartData} dataLabel="label" dataKey="label" valueAsPercent="true" />
    </section>
  );
};

export default BudgetItem;
