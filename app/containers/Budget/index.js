// @flow
import * as React from 'react';
import BudgetGrid from 'containers/BudgetGrid';
import Balance from 'containers/Balance';
import injectAsyncReducersWithDefaults from 'utils/injectAsyncReducersWithDefaults';

injectAsyncReducersWithDefaults();

const BudgetContainer = () => (
  <section>
    <BudgetGrid />
    <Balance />
  </section>
);

export default BudgetContainer;
