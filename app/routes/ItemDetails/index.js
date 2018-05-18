// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadItemDetailsContainer = () => import('containers/ItemDetails');

const ItemDetails = props => <Chunk load={loadItemDetailsContainer} {...props} />;

export default ItemDetails;
