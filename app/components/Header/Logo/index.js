// @flow
import * as React from 'react';
import logo from 'images/mclogo.svg';
import styles from './style.scss';

const Logo = () => (
  <a href="http://www.moduscreate.com">
    <img src={logo} alt="Modus Create" className={styles.logo} />
  </a>
);

export default Logo;
