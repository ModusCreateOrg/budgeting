// @flow

import * as React from 'react';

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

export default  class BudgetDetail extends React.Component <Props > {
  render() {
    return <h1>Hello,{this.props.match.params.id} </h1>;
  }
}


