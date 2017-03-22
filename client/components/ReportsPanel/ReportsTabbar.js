import React, { Component, PropTypes } from 'react';

import styles from './style.scss';

const Link = props => (
  <a
    tabIndex="0"
    data-link={props.id}
    className={props.handleSelection(props.id)}
    onClick={props.handleClick}
  >
    {props.label}
  </a>
);

Link.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};


class ReportsTabbar extends Component {
  state = {
    selected: 'flows'
  }

  getClassName = (className) => {
    const { selected } = this.state;

    return className === selected ? styles.selected : '';
  };

  handleClick = (e) => {
    const selected = e.target.getAttribute('data-link');

    this.setState({
      selected
    });
  };

  render() {
    return (
      <section className={styles.reports}>
        <div className={styles.tabbar}>
          <Link id="flows" handleSelection={this.getClassName} handleClick={this.handleClick} label="Inflow vs Outflow" />
          <Link id="spending" handleSelection={this.getClassName} handleClick={this.handleClick} label="Spending by Category" />
        </div>
      </section>
    );
  }
}

export default ReportsTabbar;
