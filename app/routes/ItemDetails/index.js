// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadItemDetailsContainer = () => import('containers/ItemDetails' /* webpackChunkName: "ItemDetails" */);
const ItemDetails = props => <Chunk {...props} id={props.match.params.id} load={loadItemDetailsContainer} />;

export default ItemDetails;
