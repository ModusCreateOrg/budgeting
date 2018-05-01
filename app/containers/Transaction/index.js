import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTransaction } from 'selectors/transactions';
import TransactionComponent from '../../components/Transaction';

// import styles from './style.scss';
const TransactionContainer = props => (
  <div>
    <TransactionComponent
      backToPreviousRoute={() => {
        console.log('backToPreviousRoute');
        props.history.goBack();
      }}
      transaction={props.transaction}
    />
  </div>
);
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
