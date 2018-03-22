// @flow
import React from 'react';

import DonutChart from 'components/DonutChart';

import styles from './style.scss';

const ItemDetails = ({ transaction, amount, balance, history }) => {
  const DonutData = [...transaction, ...balance];

  return (
    <section>
      <div
        role="link"
        tabIndex="0"
        onClick={() => {
          history.goBack();
        }}
        className={styles.backBtn}
      >
        Back
      </div>
      <h3 className={styles.title}>{transaction.description}</h3>
      <span className={amount.isNegative ? styles.neg : styles.pos}>{amount.percentage}%</span>
      <DonutChart data={DonutData} dataLabel="description" dataKey="id" />
    </section>
  );
};

export default ItemDetails;
