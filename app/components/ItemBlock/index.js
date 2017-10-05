import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import formatAmount from 'utils/formatAmount';
import calculatePercentage from 'utils/calculatePercentage';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import Piechart from 'components/Piechart';

type ItemBlockProps = {
  transaction: Transaction,
  inflowBalance: inflowBalance
};

const ItemBlock = ({ transaction, inflowBalance }: ItemBlockProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const color = amount.isNegative ? '#FF0000' : '00FF00';
  const percentage = calculatePercentage(Math.abs(transaction.value), inflowBalance);
  const RemainingPercentage = calculatePercentage(inflowBalance - Math.abs(transaction.value), inflowBalance);
  
  return (
    <section>
      <Link className={styles.button} to='/budget'>Back</Link>
      <div><h2>{transaction.description}</h2></div>
      <div className={amountCls}>{percentage}</div>
      <Piechart width={300} height={300} outerRadius={100} innerRadius={0}
        data={[{value: inflowBalance, label: RemainingPercentage, color: '0000FF'},
               {value: Math.abs(transaction.value), label: percentage, color: color }]} />

      </section>
  );
  
};

export default ItemBlock;
