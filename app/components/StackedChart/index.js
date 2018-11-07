// @flow
import { lazy } from 'react';

const LoadableStackedChart = lazy(() => import('./StackedChart' /* webpackChunkName: "stacked-chart" */));

export default LoadableStackedChart;
