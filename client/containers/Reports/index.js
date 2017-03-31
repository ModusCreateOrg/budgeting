import React from 'react';

import Chunk from 'components/Chunk';

const loadReportsPanel = () => import('components/ReportsPanel');

const Reports = () => (
  <Chunk load={loadReportsPanel}>
    { Comp => (Comp ? <Comp /> : null) }
  </Chunk>
);

export default Reports;
