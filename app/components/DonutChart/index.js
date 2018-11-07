// @flow
import { lazy } from 'react';

const LoadableDonutChart = lazy(() => import('./DonutChart' /* webpackChunkName: "donut-chart" */));

export default LoadableDonutChart;
