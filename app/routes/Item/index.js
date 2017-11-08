// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadItemPanel = () => import('components/ItemPanel' /* webpackChunkName: "item" */);

const Item = () => <Chunk load={loadItemPanel} />;

export default Item;
