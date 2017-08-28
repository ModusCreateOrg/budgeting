import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Balance = ({ title, amount, colorize, prefix }) => {
  const amountCls = colorize && (amount.isNegative ? styles.neg : styles.pos);

  const prefixElement =
    prefix &&
    <div key="prefix" className={styles.balanceSymbol}>
      {prefix}
    </div>;

  const balanceElement = (
    <div key="item" className={styles.balanceWrapper}>
      <div className={styles.balanceItem}>
        <div className={`${styles.balanceAmount} ${amountCls}`}>
          {amount.text}
        </div>
        <div className={styles.balanceTitle}>
          {title}
        </div>
      </div>
    </div>
  );

  return [prefixElement, balanceElement];
};

Balance.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired,
  colorize: PropTypes.bool,
  prefix: PropTypes.string,
};

Balance.defaultProps = {
  colorize: true,
};

export default Balance;
