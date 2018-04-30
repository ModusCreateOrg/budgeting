import * as React from 'react';
import styles from './styles.scss';

const ItemHeader = props => (
  <div className={styles.itemHeader}>
    <h1>{props.name}</h1>
    <div>
      <div className={styles.metaText}>
        <span className={styles.green}>+ {props.inflow.toFixed(2)}</span>
      </div>
      <div className={styles.metaText}>
        <span className={styles.red}>- {props.outflow.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default ItemHeader;
