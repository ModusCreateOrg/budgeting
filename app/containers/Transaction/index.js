import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'selectors/transactions';
import TransactionComponent from '../../components/Transaction';

const TransactionContainer = props => {
  const data = [
    { label: 'Working Balance', id: 0, value: props.inflow + props.outflow },
    { label: props.transaction.description, id: 1, value: Math.abs(props.transaction.value) },
  ];
  return (
    <div>
      <TransactionComponent
        backToPreviousRoute={() => props.history.goBack()}
        transaction={props.transaction}
        outflowPercentage={props.outflowPercentage}
        inflowPercentage={props.inflowPercentage}
        data={data}
      />
    </div>
  );
};
TransactionContainer.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  transaction: PropTypes.object.isRequired,
  inflow: PropTypes.number.isRequired,
  outflow: PropTypes.number.isRequired,
  inflowPercentage: PropTypes.number.isRequired,
  outflowPercentage: PropTypes.number.isRequired,
};
TransactionContainer.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state, ownProps) => ({
  transaction: selectors.getTransaction(state, ownProps.match.params.id),
  inflowPercentage: selectors.getInflowPercentage(state, ownProps.match.params.id),
  outflowPercentage: selectors.getOutflowPercentage(state, ownProps.match.params.id),
  inflow: selectors.getInflowBalance(state),
  outflow: selectors.getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionContainer);
