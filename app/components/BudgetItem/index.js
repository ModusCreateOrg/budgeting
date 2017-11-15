// @flow
import * as React from 'react';

type BugdetDetailsProps = {
  transaction: Transaction,
  contribution: Object,
};

const BudgetItem = ({ transaction, contribution }: BugdetDetailsProps) => {
  const value = transaction.value;
  const percent = contribution.percent;

  return (
    <section>
      <h1>{transaction.description}</h1>
      <h3>
        {transaction.value}({contribution.percent}%)
      </h3>
    </section>
  );
};

export default BudgetItem;
