// @flow
import * as React from 'react';
import { withRouter } from 'react-router';

const BackButton = props => (
  <div>
    <button onClick={() => props.history.goBack()}>Back</button>
  </div>
);

export default withRouter(BackButton);
