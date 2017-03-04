import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import './style.scss';

const Budget = (props) => {
  return <h1>Budget</h1>;
};

const Reports = (props) => {
  return <h1>Reports</h1>;
};

export default class App extends Component {

  render() {
    return <div>
    	<Header />

    	<Route path="/budget" component={Budget} />
    	<Route path="/reports" component={Reports} />
    </div>
  }
}
