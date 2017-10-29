// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import categoriesReducer from 'modules/categories';
import transactionsReducer from 'modules/transactions';
import { getCategories } from 'selectors/categories';
import { getInflowBalance, getOutflowBalance, getTransactions, sortTransactions } from 'selectors/transactions';
import styles from './style.scss';
import { injectAsyncReducers } from 'store';
import formatAmount from 'utils/formatAmount';

import PieChart from 'components/PieChart';

// inject reducers that might not have been originally there
injectAsyncReducers({
  categories: categoriesReducer,
  transactions: transactionsReducer,
});

type BudgetDetailProps = {
  categories: Object,
  transactions: Object,
  history: Object,
  match: Object
}

class BudgetDetail extends React.Component<BudgetDetailProps> {
  handleBackButton = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderFound = item => {
    const amount = formatAmount(item.value);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;
    let total = Math.abs(getInflowBalance(this.props));
    const data = [
      {
        category: item.description,
        categoryId: item.id,
        value: Math.abs(item.value),
      },
      {
        category: 'Remaining budget',
        categoryId: '0',
        value: total - Math.abs(item.value),
      }
    ];
    const percentage = Math.abs(item.value) / total;
    return (
      <section key={1}>
        <h2>{item.description}</h2>
        <p className={amountCls}>
          {!amount.isNegative && <span>+</span>}
          {amount.text} ({percentage.toFixed(2)}%)
        </p>
        <PieChart data={data} dataLabel="category" dataKey="categoryId" />;
      </section>
    )
  }

  renderNotFound = () => (
    <div className={styles.errorScreen}>
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>{`Sorry, something went wrong.`}</h1>
        <p>{`Please check again whether the id is correct or not.`}</p>
        <button className={styles.backButton} onClick={this.handleBackButton}>Back</button>
      </div>
    </div>
  )

  render() {
    const { match, transactions } = this.props;
    const item = transactions.find(item => item.id == match.params.id);
    if (item) {
      return [
        <button key={0} className={styles.backButton} onClick={this.handleBackButton}>Back</button>,
        this.renderFound(item)
      ];
    }
    return this.renderNotFound();
  }
}

const mapStateToProps = state => ({
  categories: getCategories(state),
  transactions: getTransactions(state)
});

export default withRouter(connect(mapStateToProps)(BudgetDetail));
