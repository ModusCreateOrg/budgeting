import React from 'react';

import Chunk from 'containers/Chunk';

const loadReportsPanel = () => import('components/ReportsPanel' /* webpackChunkName: "reports" */);

const Reports = () => <Chunk load={loadReportsPanel} />;

export default Reports;
