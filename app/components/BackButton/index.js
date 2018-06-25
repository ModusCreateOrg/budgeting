import * as React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './style.scss'
class BackButton extends React.Component<any> {
  
    render() {
        console.log("back: "+ this.props)
      return (
        <button
          className={styles.backbutton}
          onClick={this.props.history.goBack}>
            Back
        </button>
      )
    }
  }

  export default withRouter(BackButton);