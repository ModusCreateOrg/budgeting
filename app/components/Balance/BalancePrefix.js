// @flow

import React from 'react';

import styles from './style.scss';

type BalancePrefixProps = {
  text?: string,
};

const BalancePrefix = ({ text }: BalancePrefixProps): React$Element<any> =>
  <div className={styles.balanceSymbol}>
    {text}
  </div>;

BalancePrefix.defaultProps = {
  text: '',
};

export default BalancePrefix;
