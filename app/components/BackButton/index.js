// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import styles from './style.scss';

const BackButton = props => {
  let backButton = null;

  // Show back button only if there is app history (length > 2)
  if (props.history.length > 2) {
    backButton = (
      <div>
        <button onClick={() => props.history.goBack()} className={styles.backButton}>
          &lt; Go back to Budget
        </button>
      </div>
    );
  }

  return backButton;
};

export default withRouter(BackButton);
