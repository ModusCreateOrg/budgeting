// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';

import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import { injectAsyncReducers } from 'store';
import { State } from 'modules/rootReducer';

import DonutChart from 'components/DonutChart';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type TransactionDetail = {
  id: number,
  category: string,
  categoryId: string,
  description: string,
  value: number,
};

type BudgetItemType = {
  percentage: number,
  totalBudget: number,
  transaction: TransactionDetail,
};

/**
 * @description Renders several information related to an specific Budget Item
 * 
 * @param {BudgetItemType} budgetItem 
 * @returns {React.Component} A BudgetItem article
 */
export const BudgetItem = ({
  percentage,
  totalBudget,
  transaction: { category, categoryId, value, description },
}: BudgetItemType) => {
  const chartData = [
    {
      name: description,
      categoryId,
      value: Math.abs(value),
    },
    {
      name: category,
      categoryId: 'total',
      value: Math.abs(totalBudget),
    },
  ];

  return (
    <section className={styles.budgetItem}>
      {/* Not sure if this should be like this or to use something to go back
      to the previous page... */}
      <div className={styles.header}>
        <Link to="/budget">
          <button className={styles.backButton}>Back to Budget page</button>
        </Link>
      </div>
      <div className={styles.mainContent}>
        <div className={`${styles.innerSection} ${styles.details}`}>
          <h2>Item details</h2>
          <h3>Description: {description}</h3>
          <h3>Category: {category}</h3>
          <h3>
            <span>Percentage contribuited to {category}: </span>
            {value > 0 && <div className={`${styles.budgetItemSubTitle} ${styles.pos}`}>+{Math.abs(percentage)}%</div>}
            {value < 0 && <div className={`${styles.budgetItemSubTitle} ${styles.neg}`}>-{Math.abs(percentage)}%</div>}
          </h3>
        </div>
        <div className={`${styles.innerSection} ${styles.extraContent}`}>
          <h2>Contribution of {description} item to total budget</h2>
          {/* TODO: add a color prop with d3's scale.linear, based on the percentage color */}
          <DonutChart data={chartData} dataLabel={'name'} dataKey="categoryId" innerRatio={0} />
        </div>
      </div>
    </section>
  );
};

export const mapStateToProps = (state: State, { id }: { id: string }) => {
  // get all the transactions
  const transaction = getTransactions(state)
    // find the transaction with the id related
    .find(txn => txn.id === parseInt(id, 10));

  // set category for transaction found (could be in a selector)
  transaction.category = getCategories(state)[transaction.categoryId];

  // calculate total budget and percentage related to transaction
  const totalBudget = transaction.value > 0 ? getInflowBalance(state) : getOutflowBalance(state);

  return {
    percentage: parseFloat((transaction.value * 100 / totalBudget).toFixed(2)),
    totalBudget,
    transaction,
  };
};

export default connect(mapStateToProps)(BudgetItem);
