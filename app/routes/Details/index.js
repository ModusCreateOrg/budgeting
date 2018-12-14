// @flow
import React from 'react';
import Chunk from 'components/Chunk';

const loadDetailsContainer = () =>
  import('components/Details' /* webpackChunkName: "details", webpackPrefetch: true */);

const Details = () => <Chunk load={loadDetailsContainer} />;

export default Details;
