import * as React from 'react';
import DonutChart from 'components/DonutChart';
import styles from './styles.scss';

type TransactionDetailsProps = {
  isNegative: boolean;
  percent: number;
  transaction: Transaction;
  data: Transaction[];
  history: object;
};

const TransactionDetails = ({isNegative, percent, transaction, data, history }) => (
  <section>
    <div className={styles.title}>
      <h1 className={isNegative ? styles.negative : styles.positive} >
        {transaction.description}
      </h1>
      <h2 className={isNegative ? styles.negative : styles.positive}>
        {isNegative ? '-' : ''}{percent + ' %'}
      </h2>
      <a className={styles.button} onClick={history.goBack}>Go back</a>
      <DonutChart data={data} dataLabel="description" dataKey="id"/>
    </div>
  </section>
);

export default TransactionDetails;
