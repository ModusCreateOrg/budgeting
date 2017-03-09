import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import './style.scss';

const NavLink = ({ to, label }) => (
  <Route
    to={to}
    exact
    children={({ location: { pathname } }) =>
      <Link to={to} className={`nav-link ${pathname === to ? 'selected' : ''}`}>{ label }</Link>
    }
  />
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default () => (
  <div className="header">
    <NavLink to="/budget" label="Budget" />
    <NavLink to="/reports" label="Reports" />
  </div>
);
