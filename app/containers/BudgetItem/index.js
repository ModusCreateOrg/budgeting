// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import BudgetItemDetails from 'components/BudgetItemDetails';
import styles from './style.scss';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type BudgetItemProps = {
  transaction: Object,
  inflowBalance: number,
  outflowBalance: number,
  history: Object,
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  handleGoBack = (): void => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { transaction, inflowBalance, outflowBalance } = this.props;
    return (
      <section>
        <button className={styles.backButton} onClick={this.handleGoBack}>
          Back
        </button>
        <BudgetItemDetails transaction={transaction} inflowBalance={inflowBalance} outflowBalance={outflowBalance} />
      </section>
    );
  }
}

const mapStateToProps = (state, props): Object => ({
  transaction: getTransactionById(state, Number(props.match.params.id)),
  inflowBalance: getInflowBalance(state),
  outflowBalance: Math.abs(getOutflowBalance(state)),
});

export default withRouter(connect(mapStateToProps)(BudgetItem));
