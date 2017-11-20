// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemDetailsContainer = () => import('containers/ItemDetails' /* webpackChunkName: "itemDetails" */);

class ItemDetails extends Component<{}> {
    render() {
        return <Chunk load={loadItemDetailsContainer} />;
    }
}

export default ItemDetails;
