import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import './style.scss';

const Budget = () => <h1>Budget</h1>;
const Reports = () => <h1>Reports</h1>;

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route path="/budget" component={Budget} />
          <Route path="/reports" component={Reports} />
          <Redirect to="/budget" />
        </Switch>
      </div>
    );
  }
}
