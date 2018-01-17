// @flow
import React from 'react';
import DonutChart from 'components/DonutChart';
import type { Transaction } from 'modules/transactions';
import styles from './styles.scss';

class Details extends React.Component<{ transaction: Transaction }> {
  goBack = () => {
    this.props.history.goBack();
  };

  donutData = [
    {
      key: 0,
      categoryId: '0',
      value: transaction.totalBudget - transaction.value,
      label: `${transaction.flow} Budget`,
    },
    {
      key: 1,
      categoryId: '1',
      value: transaction.value,
      label: `${transaction.description}`,
    },
  ];

  render() {
    const { transaction } = this.props;

    return (
      <section>
        <button onClick={this.goBack} className={styles.backButton}>
          Go Back
        </button>
        <div className={styles.title}>
          <h2>{transaction.description}</h2>
          <h3>
            <span className={transaction.itemOperator === '+' ? styles.positive : styles.negative}>
              {transaction.itemOperator}
            </span>
            {transaction.percent}%
          </h3>
        </div>
        <div className={styles.detail}>
          <DonutChart
            dataLabel="label"
            dataKey="key"
            data={this.donutData}
          />
        </div>
      </section>
    );
  }
}

export default Details;
