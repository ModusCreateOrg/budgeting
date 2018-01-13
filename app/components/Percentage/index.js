// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

const NUMBER_OF_DECIMALS = 2;

type PercentageType = {
  balance: Number,
  value: Number,
};

const Percentage = ({ balance, value }: PercentageType) => (
  <h2
    className={classNames({
      [styles.positive]: value >= 0,
      [styles.negative]: value < 0,
    })}
  >
    {value < 0 && '-'}
    {`${Number(value * 100 / balance).toFixed(NUMBER_OF_DECIMALS)}%`}
  </h2>
);

export default Percentage;
