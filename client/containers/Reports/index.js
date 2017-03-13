import React from 'react';

import Chunk from 'components/Chunk';

const Reports = () => (
  <Chunk load={() => import('components/Chunk/dummy')}>
    { (Comp) => Comp ? <Comp /> : <h1>Reports</h1> }
  </Chunk>
);

export default Reports;
