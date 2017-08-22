import * as React from 'react';
import { Route, Link } from 'react-router-dom';

const NavLink = ({ to, label, styles }) =>
  <Route
    to={to}
    exact
    children={({ location: { pathname } }) =>
      <Link to={to} className={`${styles.navLink} ${pathname.indexOf(to) !== -1 ? styles.selected : ''}`}>
        {label}
      </Link>}
  />;

NavLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default NavLink;
