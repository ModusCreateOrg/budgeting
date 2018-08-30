// @flow

import loadable from 'utils/loadable';

const LoadableDonutChart = loadable({
  loader: () => import('./DonutChart'),
});

export default LoadableDonutChart;
