import React from 'react';
import PropTypes from 'prop-types';

import formatAmount from 'utils/formatAmount';

import styles from './style.scss';

const BudgetGridRow = props => {
  const { transaction, categories } = props;
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;

  return (
    <tr key={transaction.id}>
      <td>
        <div className={styles.cellLabel}>Category</div>
        <div className={styles.cellContent}>
          {categories[transaction.categoryId]}
        </div>
      </td>
      <td>
        <div className={styles.cellLabel}>Description</div>
        <div className={styles.cellContent}>
          {transaction.description}
        </div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>Amount</div>
        <div className={styles.cellContent}>
          {amount.text}
        </div>
      </td>
    </tr>
  );
};
BudgetGridRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};

export default BudgetGridRow;
