// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import BudgetGridRow from 'components/BudgetGridRow';

type BudgetGridClickableRowProps = {
  transaction: Transaction,
  categories: Categories,
};

const BudgetGridClickableRow = ({ transaction, categories }: BudgetGridClickableRowProps) => (
  <Route
    render={({ history }) => <BudgetGridRow history={history} transaction={transaction} categories={categories} />}
  />
);

export default BudgetGridClickableRow;
