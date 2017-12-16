// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { rgb, scaleOrdinal } from 'd3';
import { Link } from 'react-router-dom';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import transactionReducer, { type Transaction } from 'modules/transactions';
import { type State } from 'modules/rootReducer';
import DonutChart from 'components/DonutChart';
import { injectAsyncReducers } from 'store';
import styles from './style.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetItemType = {
  transaction: Transaction,
  total: number,
};

export const MaybeBudgetItem = ({ item }: { item: ?BudgetItemType }) =>
  item === null || item === undefined ? (
    <section>
      <BackButton />
      <h3>Not Found</h3>
    </section>
  ) : (
    <BudgetItem {...item} />
  );

const BudgetItem = ({ transaction: { description, value }, total }: BudgetItemType) => (
  <section>
    <BackButton />
    <h3>{description}</h3>
    <h4>
      <span className={value > 0 ? styles.budgetItemPos : styles.budgetItemNeg}>
        {Math.round(value * 100 / total)}%
      </span>
    </h4>
    <PieChart share={Math.abs(value)} total={Math.abs(total)} color={value > 0 ? styles.pos : styles.neg} />
  </section>
);

const PieChart = ({ share, total, color }: { share: number, total: number, color: string }) => (
  <DonutChart
    data={[{ value: share, categoryId: '0' }, { value: total - share, categoryId: '1' }]}
    color={scaleOrdinal([
      color,
      rgb(color)
        .brighter(3.5)
        .toString(),
    ])}
    innerRatio={0}
    showLegend={false}
  />
);

const BackButton = () => (
  <Link to="..">
    <button>Back</button>
  </Link>
);

export const mapStateToProps = (state: State, { id }: { id: string }) => {
  const transaction = /^\d+$/.test(id) ? getTransactions(state).filter(t => t.id === parseInt(id, 10))[0] : undefined;
  return transaction === undefined
    ? { item: null }
    : { item: { transaction, total: transaction.value > 0 ? getInflowBalance(state) : getOutflowBalance(state) } };
};

export default connect(mapStateToProps)(MaybeBudgetItem);
