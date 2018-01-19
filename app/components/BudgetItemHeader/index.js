// @flow
import * as React from 'react';
import { roundUp } from 'utils/arithmetic';
import type { Transaction } from 'modules/transactions';
import RowItem from './RowItem';
import styles from './style.scss';

type BudgetItemHeaderProps = {
  transaction: Transaction,
  balance: number,
};

const BudgetItemHeader = ({ transaction, balance }: BudgetItemHeaderProps) => {
  const contributionPercentage = Math.abs(transaction.value / balance) * 100;
  const roundedPercentage = roundUp(contributionPercentage, 2);
  const flow = `${transaction.value > 0 ? 'in' : 'out'}-flow`;
  return (
    <div className={styles.budgetItemDetails}>
      <RowItem label="Item Description">{transaction.description}</RowItem>
      <RowItem label="Contribution">
        <div className={styles[flow]}>{roundedPercentage}</div>
      </RowItem>
    </div>
  );
};

export default BudgetItemHeader;
