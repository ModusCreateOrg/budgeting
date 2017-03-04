import React from 'react';
import { 
	Route, Link 
} from 'react-router-dom';
import './style.scss';

const CustomLink = ({ to, label }) => {
	return (
		<Route to={ to } exact children={({ match }) => <Link to={ to } className={ match.url === to ? 'selected' : ''}>{ label }</Link> } />
	);
};

export default () => {
	return (
		<div className="header">
			<CustomLink to="/budget" label="Budget" />
			<CustomLink to="/reports" label="Reports" />
		</div>
	);
};