// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import formatPercent from 'utils/formatPercent';
import {
  getTransactionById,
  getContributionPercentage,
  getFormattedContributionPercentage,
} from 'selectors/transactions';
import getQueryParam from 'selectors/queries';
import type { Transaction } from 'modules/transactions';
import { withRouter } from 'react-router-dom';
import NavLink from 'components/NavLink';
import DonutChart from 'components/DonutChart';
import BudgetContentSubtitle from 'components/BudgetContentSubtitle';
import styles from './style.scss';

type BudgetContentDetailProps = {
  transaction: Transaction,
  contributionPercentage: number,
  data: [],
};

const BudgetContentDetail = ({ transaction, data, contributionPercentage }: BudgetContentDetailProps) => (
  <section>
    <div className={styles.budgetContentDetail}>
      <h1 className={styles.budgetContentDetailTitle}>{transaction.description}</h1>
      <NavLink to="/budget" label="< Back" styles={styles} />
    </div>
    <BudgetContentSubtitle contributionPercentage={contributionPercentage} />
    <DonutChart data={data} dataLabel="label" dataKey="value" format={value => formatPercent(value).text} />
  </section>
);

const mapStateToProps = (state, ownProps) => {
  const transaction = getTransactionById(state, parseInt(getQueryParam(ownProps.match, 'id'), 10));
  const contributionPercentage = getContributionPercentage(state, transaction);
  return {
    transaction,
    contributionPercentage,
    data: getFormattedContributionPercentage(contributionPercentage, transaction),
  };
};

export default withRouter(connect(mapStateToProps)(BudgetContentDetail));
