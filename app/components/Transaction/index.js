import React from 'react';
import PropTypes from 'prop-types';
import DonutChart from '../DonutChart';

import styles from './styles.scss';

const TransactionComponent = ({ transaction, inflowPercentage, outflowPercentage, backToPreviousRoute, data }) => (
  <div>
    <button onClick={backToPreviousRoute}>Back</button>
    <div>
      <h2>
        {transaction.category} - {transaction.description}
      </h2>
      <div className={styles.subtitle}>
        <div className={styles.pos}>+{inflowPercentage}</div>
        <div className={styles.neg}>-{outflowPercentage}</div>
      </div>
      <DonutChart data={data} dataLabel="label" dataKey="id" shouldDisplayPiChart />
    </div>
  </div>
);
TransactionComponent.propTypes = {
  transaction: PropTypes.object.isRequired,
  backToPreviousRoute: PropTypes.func.isRequired,
  inflowPercentage: PropTypes.number.isRequired,
  outflowPercentage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

TransactionComponent.defaultProps = {
  transaction: {},
};

export default TransactionComponent;
