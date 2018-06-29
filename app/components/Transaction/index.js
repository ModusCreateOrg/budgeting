// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import TransactionData from 'containers/TransactionData';
import styles from './styles.scss';

type TransactionProps = {
  // history: {
  //   length: number, // The number of entries in the history stack
  //   action: string, // The current action (PUSH, REPLACE, or POP)
  //   location: {
  //     // The current location. May have the following properties:
  //     pathname: string, // The path of the URL
  //     search: string, // The URL query string
  //     hash: string, // The URL hash fragment
  //     state: Object, // location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
  //   },
  //   push: (path: string, state?: Object) => void, // Pushes a new entry onto the history stack
  //   replace: (path: string, state?: Object) => void, // Replaces the current entry on the history stack
  //   go: (position: number) => void, // Moves the pointer in the history stack by n entries
  //   goBack: () => void, // Equivalent to go(-1)
  //   goForward: () => void, // Equivalent to go(1)
  //   block: (prompt: any) => void, // Prevents navigation (see the history docs)
  // },
  // location: {
  //   pathname: string, // The path of the URL
  //   search: string, // The URL query string
  //   hash: string, // The URL hash fragment
  //   state: Object, // location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
  // },
  match: {
    params: Object, // Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
    isExact: boolean, // true if the entire URL was matched (no trailing characters)
    path: string, // The path pattern used to match. Useful for building nested <Route>s
    url: string, // The matched portion of the URL. Useful for building nested <Link>s
  },
};

const Transaction = (props: TransactionProps) => {
  const { id } = props.match.params;

  return (
    <div className={styles.transaction}>
      <Link className={styles.backButton} to="/budget">
        <span>{'<'}</span>
        Back
      </Link>
      <TransactionData id={Number(id)} />
    </div>
  );
};

export default Transaction;
