import React from 'react';

import Chunk from 'components/Chunk';

const loadReportsPanel = () => import('components/ReportsPanel');

const Reports = () => (
  <Chunk load={loadReportsPanel} />
);

export default Reports;
