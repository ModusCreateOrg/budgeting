/**
 * Created by joaogabriellima on 17/11/17.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction, getSummarizeByTransaction, getPorcentagemByTransaction } from 'selectors/transactions';

import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import BackButton from 'components/BackButton';
import ItemNotFound from 'components/ItemNotFound';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type DetailProps = {
  transaction: Object,
};

export class DetailContainer extends React.Component<DetailProps> {
  static defaultProps = {
    transaction: null,
  };

  render() {
    const { transaction } = this.props;
    if (transaction === null) {
      return [<ItemNotFound />, <BackButton />];
    }
    return <h1>Detail page</h1>;
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
