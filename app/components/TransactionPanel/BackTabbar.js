// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import styles from './style.scss';

const BackTabbar = props => (
  <div className={styles.tabbar}>
    <button
      onClick={() => {
        props.history.goBack();
      }}
      className={`${styles.navLink}`}
    >
      Back
    </button>
  </div>
);

// Export with Router, so we can access the history
export default withRouter(BackTabbar);
