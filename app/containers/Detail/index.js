/**
 * Created by joaogabriellima on 17/11/17.
 */
// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction, getSummarizeByTransaction, getPorcentagemByTransaction } from 'selectors/transactions';

import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import BackButton from 'components/BackButton';
import ItemNotFound from 'components/ItemNotFound';
import PieChart from 'components/PieChart';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type DetailProps = {
  transaction: Object,
};

const DetailTitle = ({ transaction, porcentageByTransaction }: DetailProps) => {
  const isNegative = transaction.value < 0;
  const amountCls = isNegative ? styles.neg : styles.pos;
  return (
    <header>
      <h1>{transaction.description}</h1>
      <h2 className={amountCls}>
        {porcentageByTransaction.text} of total {isNegative ? 'outflows' : 'inflows'}{' '}
      </h2>
    </header>
  );
};

const DetailChart = ({ data }) => (
  <section>
    <p>How much of the entire budget this item is contributing:</p>
    <PieChart data={data} dataLabel="category" dataKey="categoryId" type="porcentage" />
  </section>
);

export class DetailContainer extends React.Component<DetailProps> {
  static defaultProps = {
    transaction: null,
  };

  render() {
    const { transaction, data, porcentageByTransaction } = this.props;
    if (transaction === null) {
      return [<ItemNotFound />, <BackButton />];
    }
    return (
      <section className={styles.header}>
        <BackButton />
        <DetailTitle transaction={transaction} porcentageByTransaction={porcentageByTransaction} />
        <DetailChart data={data} />
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const transactionId = ownProps.match.params.id;
  return {
    transaction: getTransaction(state, transactionId),
    data: getSummarizeByTransaction(state, transactionId),
    porcentageByTransaction: getPorcentagemByTransaction(state, transactionId),
  };
};

export default connect(mapStateToProps)(DetailContainer);
