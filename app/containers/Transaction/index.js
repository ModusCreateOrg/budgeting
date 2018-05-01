import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formatAmount from 'utils/formatAmount';
import { getTransaction, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import TransactionComponent from '../../components/Transaction';
import styles from './style.scss';

const TransactionContainer = props => {
  const amount = formatAmount(props.transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  console.log(props);
  return (
    <div>
      <TransactionComponent
        backToPreviousRoute={() => props.history.goBack()}
        transaction={props.transaction}
        subtitle={<div className={amountCls}>{amount.text}</div>}
        inflow={props.inflow}
        outflow={props.outflow}
      />
    </div>
  );
};
TransactionContainer.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  inflow: PropTypes.number.isRequired,
  outflow: PropTypes.number.isRequired,
};
TransactionContainer.defaultProps = {
  match: {
    params: {},
  },
  transaction: {},
};

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps.match.params.id),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionContainer);
