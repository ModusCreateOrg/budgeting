// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadReportsPanel = () =>
  import('components/ReportsPanel' /* webpackChunkName: "reports", webpackPrefetch: true */);

const Reports = () => <Chunk load={loadReportsPanel} />;

export default Reports;
