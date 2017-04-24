import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

const NavLink = ({ to, label, styles }) => (
  <Route
    to={to}
    exact
    children={({ location: { pathname } }) => (
      <Link to={to} className={`${styles.navLink} ${pathname.indexOf(to) !== -1 ? styles.selected : ''}`}>
        {label}
      </Link>
    )}
  />
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

export default NavLink;
