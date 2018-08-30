// @flow

import * as React from 'react';
import ReactLoadable from 'react-loadable';
import Loading from 'components/Loading';

type LoadingProps = {
  pastDelay: boolean,
  error: ?Error,
};

const Placeholder = (props: LoadingProps) => {
  if (props.error) {
    return (
      <div>
        <p>Encountered an error</p>
      </div>
    );
  }
  if (props.pastDelay) {
    return Loading;
  }
  return null;
};

export default function loadable(options: Object) {
  return ReactLoadable({
    loading: Placeholder,
    delay: 500,
    ...options,
  });
}
