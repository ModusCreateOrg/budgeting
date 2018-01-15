import React from 'react';
import DonutChart from 'components/DonutChart';
import type { Transaction } from 'modules/transactions';
import styles from './styles.scss';
type DetailSectionProps = {
  transaction: Transaction
};

class DetailSection extends React.Component<DetailSectionProps> {
  render() {
    const { transaction, onGoBack } = this.props;

    return (
      <section>
        <button onClick={onGoBack} className="go-back">
          Go Back
        </button>
        <div className={styles.heading}>
          <h2>{transaction.description}</h2>
          <h3>
            <span className={transaction.sign === '+' ? styles.inflow : styles.outflow}>{transaction.sign}</span>
            {transaction.percent}%
          </h3>
        </div>
        <div className={styles.detail}>
          <DonutChart
            dataLabel="label"
            dataKey="key"
            data={[
              { key: 0, categoryId: '0', value: transaction.value, label: 'Item' },
              { key: 1, categoryId: '1', value: transaction.total - transaction.value, label: 'Rest' },
            ]}
          />
        </div>
      </section>
    );
  }
}

export default DetailSection;
