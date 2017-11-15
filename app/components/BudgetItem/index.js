// @flow
import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import DonutChart from 'components/DonutChart';

type BugdetDetailsProps = {
  transaction: Transaction,
  contribution: Object,
};

const BudgetItem = ({ transaction, contribution }: BugdetDetailsProps) => {
  const chartData = [
    {
      value: parseFloat(contribution.percent),
      label: transaction.description
    },
    {
      value: 100 - parseFloat(contribution.percent),
      label: 'Total'
    }
  ];
  return (
    <section>
      <Route>
        <Link to="/budget">Back</Link>
      </Route>
      <h1>{transaction.description}</h1>
      <h3>
        {transaction.value}({contribution.percent}%)
      </h3>
      <DonutChart data={chartData} dataLabel="label" dataKey="label" isPercentage />
    </section>
  );
};

export default BudgetItem;
