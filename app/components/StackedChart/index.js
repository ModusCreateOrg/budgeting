// @flow

import loadable from 'utils/loadable';

const LoadableStackedChart = loadable({
  loader: () => import('./StackedChart'),
});

export default LoadableStackedChart;
