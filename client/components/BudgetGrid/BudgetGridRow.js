import React, { PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';

const BudgetGridRow = (props) => {
  const { transaction, categories } = props;
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? 'neg' : 'pos';

  return (
    <tr key={transaction.id}>
      <td>{categories[transaction.categoryId]}</td>
      <td>{transaction.description}</td>
      <td className={amountCls}>{amount.text}</td>
    </tr>
  );
};
BudgetGridRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired
};

export default BudgetGridRow;
