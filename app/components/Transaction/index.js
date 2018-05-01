import React from 'react';
import PropTypes from 'prop-types';

const TransactionComponent = props => {
  console.log(props);
  return (
    <div>
      <button
        onClick={() => {
          props.backToPreviousRoute();
          console.log('onclick');
        }}
      >
        Back
      </button>
      <div>
        <h2>
          {props.transaction.category} - {props.transaction.description}
        </h2>
      </div>
    </div>
  );
};
TransactionComponent.propTypes = {
  transaction: PropTypes.object.isRequired,
  backToPreviousRoute: PropTypes.func.isRequired,
};

TransactionComponent.defaultProps = {
  transaction: {},
};

export default TransactionComponent;
