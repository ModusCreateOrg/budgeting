// @flow
import * as React from 'react';
import { Route, Link } from 'react-router-dom';

type NavLinkProps = {
  to: string,
  label: string,
  styles: Object,
};

const NavLink = ({ to, label, styles }: NavLinkProps) => (
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

export default NavLink;
