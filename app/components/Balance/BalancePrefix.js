// @flow

import * as React from 'react';

import styles from './style.scss';

type BalancePrefixProps = {
  text: string,
};

const BalancePrefix = ({ text }: BalancePrefixProps) =>
  <div className={styles.balanceSymbol}>
    {text}
  </div>;

BalancePrefix.defaultProps = {
  text: '',
};

export default BalancePrefix;
