// @flow
import React from 'react';
import styles from './styles.scss';

type GoBackProps = {
  goBack: Function,
  text: string,
};

const GoBack = (props : GoBackProps) => (
  <div className={styles.containerGoBack} onClick={props.goBack} role="button" tabIndex="0">
    <span>{props.text}</span>
  </div>
);

export default GoBack;
