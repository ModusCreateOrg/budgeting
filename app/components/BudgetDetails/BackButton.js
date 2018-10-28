// @flow
import * as React from 'react';
import style from './style.scss';

class BackButton extends React.Component {
  static contextTypes = {
    router: () => {},
  };
  render() {
    return (
      <div className={style['button-wrapper']}>
        <button className={style['back-button']} onClick={this.context.router.history.goBack}>
          Previous Page
        </button>
      </div>
    );
  }
}

export default BackButton;
