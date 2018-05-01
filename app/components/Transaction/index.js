import React from 'react';
import PropTypes from 'prop-types';

const TransactionComponent = props => (
  <div>
    <div>{JSON.stringify(props.transaction)}</div>
    <button onClick={props.backToPreviousRoute}>Back</button>
    <div>
      <h2>
        {props.transaction.category} - {props.transaction.description}
      </h2>
      <div>{props.subtitle}</div>
      <div>inflow: {props.inflow}</div>
      <div>outflow: {props.outflow}</div>
    </div>
  </div>
);
TransactionComponent.propTypes = {
  transaction: PropTypes.object.isRequired,
  backToPreviousRoute: PropTypes.func.isRequired,
  subtitle: PropTypes.element.isRequired,
  inflow: PropTypes.number.isRequired,
  outflow: PropTypes.number.isRequired,
};

TransactionComponent.defaultProps = {
  transaction: {},
};

export default TransactionComponent;
