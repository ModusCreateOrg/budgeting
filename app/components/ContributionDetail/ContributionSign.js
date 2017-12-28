// @flow
import * as React from 'react';
import styles from './style.scss';

type ContributionSignProps = {
  value: number,
};

const ContributionSign = ({ value }: ContributionSignProps) => {
  const colorClass = value > 0 ? styles.pos : styles.neg;
  const sign = value > 0 ? '+' : '-';
  return <span className={`${styles.contributionSign} ${colorClass}`}>{sign}</span>;
};

export default ContributionSign;
