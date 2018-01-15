// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadDetailContainer = () => import('containers/Detail' /* webpackChunkName: "Detail" */);

const Detail = props => <Chunk {...props} id={props.match.params.id} load={loadDetailContainer} />;

export default Detail;
