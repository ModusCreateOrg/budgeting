// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.scss';

type TableRowProps = {
  tdClass?: string,
  children: string,
  link: string,
};

const TableData = (props: TableRowProps) => {
  // Composing table rows into component in order to resolve the inablility of 'a' tags to wrap around 'td' tag
  const content = props.link ? (
    <NavLink
      to={props.link}
      activeStyle={{
        backgroundColor: '#ccc',
      }}
    >
      {props.children}
    </NavLink>
  ) : (
    <div className={styles.cellContent}>{props.children}</div>
  );

  return <td className={props.tdClass}>{content}</td>;
};

export default TableData;
