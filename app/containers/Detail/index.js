/**
 * Created by joaogabriellima on 17/11/17.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';

import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

export class DetailContainer extends React.Component<DetailProps> {
  static defaultProps = {
    transaction: null,
  };

  render() {
    return <h1>Detail page</h1>;
  }
}

export default DetailContainer;
