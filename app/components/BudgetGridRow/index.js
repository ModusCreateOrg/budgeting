// @flow
import * as React from 'react';
import formatAmount from 'utils/amoutAndNumbers';
import Td from 'components/BudgetGridRow/TableData';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
};

const BudgetGridRow = ({ transaction, categories }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];
  const linkto = `/budget/${description}/${id}`.replace(/ /g, '-').replace(/--/g, '');

  return (
    <tr key={id}>
      <Td link={linkto}>
        <div className={styles.cellLabel}>Category</div>
        <div className={styles.cellContent}>{category}</div>
      </Td>
      <Td link={linkto}>
        <div className={styles.cellLabel}>Description</div>
        <div className={styles.cellContent}>{description}</div>
      </Td>
      <Td className={amountCls} link={linkto}>
        <div className={styles.cellLabel}>Amount</div>
        <div className={styles.cellContent}>{amount.text}</div>
      </Td>
    </tr>
  );
};

export default BudgetGridRow;
