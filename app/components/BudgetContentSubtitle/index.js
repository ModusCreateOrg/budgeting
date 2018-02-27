// @flow
import * as React from 'react';
import formatPercent from 'utils/formatPercent';
import styles from './style.scss';

type BudgetContentSubtitleProps = {
  contributionPercentage: object,
};

const BudgetContentSubtitle = ({ contributionPercentage }: BudgetContentSubtitleProps) => (
  <h2>
    {contributionPercentage.value > 0 && <span className={styles.pos}>+</span>}
    {contributionPercentage.value < 0 && <span className={styles.neg}>-</span>}
    {formatPercent(contributionPercentage.contribution, false).text}
  </h2>
);

export default BudgetContentSubtitle;
