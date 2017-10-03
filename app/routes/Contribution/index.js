// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadContributionContainer = () => import('containers/Contribution' /* webpackChunkName: "transaction" */);

class Contribution extends Component<{}> {
  render() {
    return <Chunk load={loadContributionContainer} />;
  }
}

export default Contribution;
