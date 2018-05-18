// @flow
import * as React from 'react';
import BudgetDetails from 'containers/BudgetDetails';

const BudgetRowDetailsContainer = ({ match }) => {
  return (
    <section>
      <BudgetDetails id={match.params.id}/>
    </section>
  );
};

export default BudgetRowDetailsContainer;
