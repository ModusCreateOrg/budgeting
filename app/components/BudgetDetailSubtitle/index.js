// @flow

import * as React from 'react';

import styles from './styles.scss';
import isPositive from '../../utils/isPositive';
import getPercentage from '../../utils/getPercentage';
import formatAmount from '../../utils/formatAmount';

type BudgetDetailSubtitleProps = {
  amount: Number,
  totalInflow: Number,
  totalOutflow: Number,
};

const BudgetDetailSubtitle = ({ amount, totalInflow, totalOutflow }: BudgetDetailSubtitleProps) => {
  const isInflow = isPositive(amount);
  const percentage = isInflow ? getPercentage(amount, totalInflow) : getPercentage(amount, totalOutflow);
  const formattedAmount = formatAmount(amount);
  return (
    <div className={`${isInflow ? styles.inflowDescription : styles.outflowDescription}`}>
      {formattedAmount.text} ({percentage}% of total {isInflow ? 'inflows' : 'outflows'})
    </div>
  );
};

BudgetDetailSubtitle.defaultProps = {
  amount: 1,
  totalInflow: 0,
  totalOutflow: 0,
};

export default BudgetDetailSubtitle;
