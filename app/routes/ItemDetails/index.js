import React from 'react';

import Chunk from 'components/Chunk';

const loadItemDetails = () => import('containers/ItemDetails');

const ItemDetails = () => <Chunk load={loadItemDetails} />;

export default ItemDetails;
