// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { injectAsyncReducers } from 'store';
import formatAmount from 'utils/formatAmount';
import getPercentage from 'utils/getPercentage';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import type { Transaction } from 'modules/transactions';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type TransactionDataProps = {
  id: number,
  transactions: Transaction[],
  categories: Object,
};

const TransactionData = ({ id, transactions, categories }: TransactionDataProps) => {
  const transaction = transactions.find(trans => trans.id === id);
  const amount = formatAmount(transaction.value);
  const percentage = getPercentage(transaction, transactions);
  const amountCls = amount.isNegative ? 'valuesNegative' : 'valuesPositive';
  const percentageValue = Number(percentage.replace('%', '')) / 100;

  if (transaction) {
    const category = categories[transaction.categoryId];

    return (
      <div>
        <header className={styles.header}>
          <h1 className={styles.title}>{transaction.description}</h1>
          <div className={styles.category}>{category}</div>
          <div className={styles[amountCls]}>
            <span>{amount.text}</span>
            <span>({percentage})</span>
          </div>
        </header>
        <main className={styles.chart}>
          <DonutChart
            data={[
              {
                value: percentageValue,
                key: '1',
                label: transaction.description,
              },
              {
                value: 1 - percentageValue,
                key: '2',
                label: `Other ${amount.isNegative ? 'Spends' : 'Income'}`,
              },
            ]}
            dataLabel="label"
            dataKey="key"
            percentage
          />
        </main>
      </div>
    );
  }

  return null;
};

TransactionData.defaultProps = {
  transactions: [],
  categories: {},
};

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps)(TransactionData);
