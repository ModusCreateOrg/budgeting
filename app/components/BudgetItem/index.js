// @flow
import * as React from 'react';

type BugdetDetailsProps = {
  transaction: Transaction
};

const BudgetItem = ({ transaction }: BugdetDetailsProps) => {
  const value = transaction.value;
  return <span>{value}</span>;
};

export default BudgetItem;
