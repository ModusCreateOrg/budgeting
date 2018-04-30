// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadItemContainer = () => import('containers/Item' /* webpackChunkName: "item" */);

const Item = props => <Chunk load={loadItemContainer} {...props} />;

export default Item;
