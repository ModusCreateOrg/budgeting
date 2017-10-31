// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectAsyncReducers } from 'store';
import type { Transaction as TransactionType } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import { getRemainingFlowAsTransaction, getTransaction } from 'selectors/transactions';
import PieChart from 'components/PieChart';

import style from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type ItemProps = {
  transaction: TransactionType,
  remainingFlow: TransactionType,
  data: TransactionType[],
  onBackClick: () => void,
};

class Transaction extends React.Component<ItemProps> {
  render() {
    const { transaction, remainingFlow, onBackClick } = this.props;

    const isInflow = transaction.value > 0;
    const absTransactionValue = Math.abs(transaction.value);
    const percentage = absTransactionValue * 100 / (remainingFlow.value + absTransactionValue);
    const twoDecimalsPercentage = Math.round(percentage * 100) / 100;

    const percentageClass = isInflow ? style.inflowPercentage : style.outflowPercentage;

    const data = [
      {
        ...transaction,
        value: absTransactionValue,
      },
      remainingFlow,
    ];

    return (
      <div className={style.transaction}>
        <button onClick={onBackClick}>Back</button>
        <h2>{transaction.description}</h2>
        <h4 className={percentageClass}>{`${isInflow ? '+' : '-'}${twoDecimalsPercentage}%`}</h4>
        <PieChart data={data} dataLabel="description" dataKey="description" dataValue="value" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps),
  remainingFlow: getRemainingFlowAsTransaction(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onBackClick: ownProps.history.goBack,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transaction));
