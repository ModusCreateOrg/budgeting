// @flow
import type { Transaction } from 'modules/transactions';

export default function getPercentage(transaction: Transaction, transactions: Transaction[]) {
  const values = transactions.filter(transactio => {
    if (transaction.value < 0) {
      return transactio.value < 0;
    }

    return transactio.value >= 0;
  });

  const percentage =
    Math.abs(transaction.value) /
    Math.abs(
      values.reduce((prev, current) => ({
        ...prev,
        value: prev.value + current.value,
      })).value
    );

  return `${(percentage * 100).toFixed(2)}%`;
}
