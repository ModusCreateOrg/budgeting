// @flow
import React from 'react';

import Chunk from 'components/Chunk';

const loadBudgetDetails = () => import('components/BudgetDetails' /* webpackChunkName: "Details" */);

const Details = props => <Chunk load={loadBudgetDetails} routeProps={props} />;

export default Details;
