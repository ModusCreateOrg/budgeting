import React, { PropTypes } from 'react';

import BudgetGrid from 'components/BudgetGrid';
import Balance from 'containers/Balance';

const BudgetContainer = ({ data }) => (
  <div>
    <BudgetGrid data={data} />
    <Balance />
  </div>
);

BudgetContainer.propTypes = {
  data: PropTypes.object.isRequired
};

export default BudgetContainer;
