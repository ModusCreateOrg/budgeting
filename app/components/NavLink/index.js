// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type NavLinkProps = {
  to: string,
  label: string,
  styles: Object,
};

const StyledNavLink = ({ to, label, styles }: NavLinkProps) => (
  <NavLink to={to} className={styles.navLink} activeClassName={styles.selected}>
    {label}
  </NavLink>
);

export default StyledNavLink;
