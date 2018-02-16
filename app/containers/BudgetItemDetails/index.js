// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectAsyncReducers } from 'store';
import { withRouter } from 'react-router-dom';
import type { Match, RouterHistory } from 'react-router-dom';
import { getTransactions, getInflowBalance, getOutflowBalance } from '../../selectors/transactions';
import transactionReducer from '../../modules/transactions';
import type { Transaction } from '../../modules/transactions';
import formatPercentage from '../../utils/formatPercentage';
import formatAmount from '../../utils/formatAmount';
import styles from './style.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemDetailsProps = {
  match: Match,
  transactions: Transaction[],
  history: RouterHistory,
  inflowBalance: number,
  outflowBalance: number,
};

export const BudgetItemDetails = ({
  match,
  transactions,
  history,
  inflowBalance,
  outflowBalance,
}: BudgetItemDetailsProps) => {
  const getItem = itemIdToGet => ({ id }) => id === Number(itemIdToGet);
  const { itemId } = match.params;
  const item = transactions.filter(getItem(itemId))[0];

  const isInflow = item.value > 0;
  const percentageOfTotal = formatPercentage(item.value / (isInflow ? inflowBalance : outflowBalance) * 100, {
    decimals: 1,
  });

  return (
    <div className={styles.budgetItemDetails}>
      <div className={`goBackButton ${styles.goBackButton}`} onClick={history.goBack} role="button" tabIndex="0">
        Back
      </div>
      <div>
        <h1>{item.description}</h1>
        <h2>
          Amount {isInflow ? 'in' : 'spent'}: {' '}
          {isInflow ? (
            <span className={styles.textGreen}>{formatAmount(item.value).text}</span>
          ) : (
            <span className={styles.textRed}>{formatAmount(item.value).text}</span>
          )}
        </h2>
        <h3>
          which is {percentageOfTotal} of total {isInflow ? 'inflow' : 'outflow'} {' '}
          {isInflow ? (
            <span className={styles.textGreen}>{formatAmount(inflowBalance).text}</span>
          ) : (
            <span className={styles.textRed}>{formatAmount(outflowBalance).text}</span>
          )}
        </h3>
      </div>
    </div>
  );
};

BudgetItemDetails.propTypes = {
  inflowBalance: PropTypes.number.isRequired,
  outflowBalance: PropTypes.number.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflowBalance: getInflowBalance(state),
  outflowBalance: getOutflowBalance(state),
});
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BudgetItemDetails));
