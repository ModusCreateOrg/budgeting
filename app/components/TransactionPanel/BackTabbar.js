// @flow
import * as React from 'react';
import styles from './style.scss';
import { withRouter } from 'react-router'

const BackTabbar = (props, context) => (
  <div className={styles.tabbar}>
    <button 
      onClick={(e) => {props.history.goBack();}}
      className={`${styles.navLink}`}>
        Back
    </button>
  </div>
);

const BackTabbarWithRouter = withRouter(BackTabbar)

export default BackTabbarWithRouter;
