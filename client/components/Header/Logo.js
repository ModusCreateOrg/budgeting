import React from 'react';
import logo from 'images/mclogo.svg';
import styles from './style.scss';

const Logo = () => (
  <a className={styles.logo} href="http://www.moduscreate.com">
    <img src={logo} alt="Modus Create" />
  </a>
);

export default Logo;
