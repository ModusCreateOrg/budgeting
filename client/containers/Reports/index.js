import React from 'react';

import Chunk from 'components/Chunk';

const Reports = () => (
  <Chunk load={() => import('components/ReportsPanel')}>
    { Comp => (Comp ? <Comp /> : null) }
  </Chunk>
);

export default Reports;
