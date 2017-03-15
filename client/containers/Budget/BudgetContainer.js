import React, { PropTypes } from 'react';

import BudgetGrid from 'components/BudgetGrid';
import Balance from 'containers/Balance';

const BudgetContainer = ({ data }) => (
  <section>
    <BudgetGrid data={data} />
    <Balance />
  </section>
);

BudgetContainer.propTypes = {
  data: PropTypes.object.isRequired
};

export default BudgetContainer;
