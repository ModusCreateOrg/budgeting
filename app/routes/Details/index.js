// @flow
import React ,{Component}from 'react';

import Chunk from 'components/Chunk';

const loadDetailPanel = () => import('containers/DetailsPanel' /* webpackChunkName: "details" */);

// const Details = () => <Chunk load={loadDetailPanel} />;
class Details extends Component<{}> {
    render() {
      return <Chunk load={loadDetailPanel} {...this.props}/>;
    }
  }
export default Details;