import React from 'react';
import { Route, Link } from 'react-router-dom';
import './style.scss';

const NavLink = ({ to, label }) => {
	return (
		<Route to={ to } exact children={({ match }) => (
			<Link to={ to } className={`nav-link ${match.url === to ? 'selected' : ''}`}>{ label }</Link> 
		)} />
	);
};

export default () => (
	<div className="header">
		<NavLink to="/budget" label="Budget" />
		<NavLink to="/reports" label="Reports" />
	</div>
);