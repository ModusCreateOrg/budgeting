// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadDetailContainer = () => import('containers/Detail' /* webpackChunkName: "detail" */);

class Budget extends Component<{}> {
  render() {
    return <Chunk load={loadDetailContainer} />;
  }
}

export default Budget;
