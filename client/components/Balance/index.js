import React, { PropTypes } from 'react';

import styles from './style.scss';

const Balance = ({ title, amount, colorize }) => {
  const amountCls = colorize && (amount.isNegative ? styles.neg : styles.pos);

  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceItem}>
        <div className={`${styles.balanceAmount} ${amountCls}`}>{amount.text}</div>
        <div className={styles.balanceTitle}>{title}</div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired,
  colorize: PropTypes.bool,
};

Balance.defaultProps = {
  colorize: true,
};

export default Balance;
