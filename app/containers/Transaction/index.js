import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formatAmount from 'utils/formatAmount';
import { getTransaction } from 'selectors/transactions';
import TransactionComponent from '../../components/Transaction';

import styles from './style.scss';

const TransactionContainer = props => {
  const amount = formatAmount(props.transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  return (
    <div>
      <TransactionComponent
        backToPreviousRoute={() => props.history.goBack()}
        transaction={props.transaction}
        subtitle={<div className={amountCls}>{amount.text}</div>}
      />
    </div>
  );
};
TransactionContainer.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
TransactionContainer.defaultProps = {
  match: {
    params: {},
  },
  transaction: {},
};

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(TransactionContainer);
