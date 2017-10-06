// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transaction';
import PieChart from 'components/PieChart';
import styles from './style.scss';

type TransactionDetailProps = {
  transaction: Transaction,
  totalBudget: number,
};

const TransactionDetail = ({ transaction, totalBudget }: TransactionDetailProps) => {
  if (!transaction) throw Error('a transaction is required');
  if (!transaction.value) throw Error('a transaction value is required');
  const isNegativeAmount = transaction.value < 0;
  const amountCls = isNegativeAmount ? styles.neg : styles.pos;
  const percentContribution = parseFloat(Math.abs(transaction.value) / totalBudget * 100);

  return (
    <div className={styles.transactionDetails}>
      <div className={styles.transactionText}>
        <ul>
          <li>
            <span className={amountCls}>{`${isNegativeAmount ? '-' : '+'}${percentContribution}%`}</span>
          </li>
        </ul>
      </div>

      <div className={styles.transactionChart}>
        <PieChart percentToHightlight={percentContribution} size={200} />
      </div>
    </div>
  );
};

export default TransactionDetail;
