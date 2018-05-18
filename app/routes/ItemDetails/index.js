import React from 'react';

import Chunk from 'components/Chunk';

const loadItemDetails = () => import('containers/ItemDetails');

const itemDetails = props => <Chunk load={loadItemDetails} {...props}/>;

export default itemDetails;