// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import { getTransactions } from 'selectors/transactions';

type TransactionBudgetHeaderProps = {
  transactions: Transaction[],
  transactionId: Int,
};

const TransactionBudgetHeader = ({ transactions, transactionId }: TransactionBudgetHeaderProps) => (

   <h3>{transactions[transactionId].description}</h3>
  

);

const mapStateToProps = state => ({
  transactions: getTransactions(state),
});

export default connect(mapStateToProps)(TransactionBudgetHeader);