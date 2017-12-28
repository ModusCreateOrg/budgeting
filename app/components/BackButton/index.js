/**
 * Created by joaogabriellima on 16/11/17.
 */

import * as React from 'react';
import NavLink from 'components/NavLink';
import styles from './style.scss';

const BackButton = () => <NavLink to="/budget" label="Back" styles={styles} />;

export default BackButton;
