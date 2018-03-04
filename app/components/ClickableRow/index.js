// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import BudgetGridRow from 'components/BudgetGridRow';

type ClickableRowProps = {
  transaction: Transaction,
  categories: Categories,
};

//To make the BudgetGridRow a clickable row
const ClickableRow = ({ transaction, categories }: ClickableRowProps) => (
  <Route
    render={({ history }) => <BudgetGridRow history={history} transaction={transaction} categories={categories} />}
  />
);

export default ClickableRow;
