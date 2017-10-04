import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import formatAmount from 'utils/formatAmount';
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

  return (
    <section>
      <Link className={styles.button} to='/budget'>Back</Link>
      <div><h2>{transaction.description}</h2></div>
      <div className={amountCls}>{amount.text}</div>
      <Piechart width={300} height={300} outerRadius={100} innerRadius={0}
        data={[{value: inflowBalance, label: inflowBalance},
               {value: Math.abs(transaction.value), label: Math.abs(transaction.value).toString() }]} />

      </section>
  );
  
};

export default ItemBlock;
