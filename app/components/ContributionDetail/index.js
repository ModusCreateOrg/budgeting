// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import PieChart from 'components/PieChart';
import ContributionSign from './ContributionSign';
// import formatAmount from 'utils/formatAmount';
import styles from './style.scss';

type ContributionDetailProps = {
  transaction: Transaction,
  categories: Categories,
  absoluteBalance: number,
};

const ContributionDetail = ({ transaction, categories, absoluteBalance }: ContributionDetailProps) => {
  const absTransactionValue = Math.abs(transaction.value);
  const contributionPercentage = Math.floor(absTransactionValue / absoluteBalance * 100);
  const category = categories[transaction.id];
  return (
    <div>
      <header>
        <h2 className={styles.contributionTitle}>
          {category} - {transaction.description}
        </h2>
        <h4 className={styles.contributionSubtitle}>
          <ContributionSign value={transaction.value} /> {contributionPercentage}%
        </h4>
      </header>
      <PieChart
        data={[
          {
            value: absoluteBalance - absTransactionValue,
            label: `Other transactions`,
            key: 'other',
          },
          {
            value: absTransactionValue,
            label: `${category} - ${transaction.description}`,
            key: 'contribution',
          },
        ]}
        dataLabel="label"
        dataKey="key"
      />
    </div>
  );
};

export default ContributionDetail;
