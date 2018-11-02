// @flow
import * as React from 'react';
import Loading from 'components/Loading';

export type Options = {
  loader: () => Promise,
  fallback: React.Node,
  maxDuration: number,
};

const defaultOptions = {
  fallback: Loading,
  maxDuration: 500,
};

export default function loadable(options: Options) {
  const safeOptions = { ...defaultOptions, ...options };
  const Fallback = safeOptions.fallback;
  const LazyComponent = React.lazy(safeOptions.loader);

  return props => (
    <React.Suspense maxDuration={safeOptions.maxDuration} fallback={<Fallback />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}
