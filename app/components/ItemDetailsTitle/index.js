// @flow
import React from 'react';
import styles from './styles.scss';

type ItemDetailtsTitleProps = {
  title: string,
  subtitle: string,
  type: Boolean,
};

const ItemDetailtsTitle = ({ title, subtitle, type }): ItemDetailtsTitleProps => (
  <div className={type ? styles.negative : styles.positive}>
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </div>
);

export default ItemDetailtsTitle;
