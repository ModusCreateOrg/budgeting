// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import TransactionData from 'containers/TransactionData';
import styles from './styles.scss';

type TransactionModalProps = {
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

const TransactionModal = (props: TransactionModalProps) => {
  const { id } = props.match.params;
  const { push } = props.history;

  return (
    <div className={styles.modal} onClick={() => push('/budget')} role="button" tabIndex="-1">
      <main
        className={styles.transactionModal}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            push('/budget');
          }
        }}
        role="menu"
        tabIndex="-1"
      >
        <button className={styles.close} onClick={() => push('/budget')} title="Close">
          X
        </button>
        <TransactionData id={Number(id)} />
      </main>
    </div>
  );
};

export default TransactionModal;
