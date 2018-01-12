// @flow
import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

const GoBackButton = ({ className, ...props }: any) => (
  <button {...props} className={classnames(styles.button, className)}>
    ← Go Back
  </button>
);

export default GoBackButton;
