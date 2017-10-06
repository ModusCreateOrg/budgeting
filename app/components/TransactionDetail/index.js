// @flow
import * as React from 'react';
import type { Transaction } from 'modules/Transaction';
import NavLink from 'components/NavLink';
import PieChart from 'components/PieChart';
import styles from './style.scss';

type TransactionDetailProps = {
  transaction: Transaction,
  totalBalance: number
};

const TransactionDetail = ({ transaction, totalBalance }: TransactionDetailProps) => {
  const isNegativeAmount = transaction.value < 0;
  const amountCls = isNegativeAmount ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const percentContribution = parseFloat(( Math.abs(transaction.value) / totalBalance ) * 100).toFixed(2);

  return (
    <div className={styles.transactionDetails}>
      <div className={styles.transactionText}>
        <ul>
          <li>
            <span className={amountCls}>{`${isNegativeAmount? '-' : '+'}${percentContribution}%`}</span>
          </li>
        </ul>
      </div>

      <div className={styles.transactionChart}>
        <PieChart percentToHightlight={percentContribution} size={200}/>
      </div>
    </div>
  );
};

export default TransactionDetail;
