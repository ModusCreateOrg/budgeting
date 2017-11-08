/* 
* @flow
*/
import * as React from 'react';
import { withRouter } from 'react-router';
import { compose, type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBudgetItem, getFlowAsTransaction } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

import type { Transaction as TransactionT } from 'modules/transactions';
import style from './style.scss';

type PropsT = {
  item: TransactionT,
  flow: TransactionT,
};

const BudgetItem = ({ item, flow }: PropsT): React.Node => {
  const { description, value } = item;
  const positiveFlow: boolean = value > 0;
  const absValue = Math.abs(value);
  const percentage = absValue * 100 / (flow.value + absValue);
  const className = positiveFlow ? style.positive : style.negative;
  const data = [
    {
      ...item,
      value: absValue,
    },
    flow,
  ];
  return (
    <div>
      <Link to="/budget">
        <button>Back</button>
      </Link>
      <h2>{description}</h2>
      <h4>
        <span className={className}>{positiveFlow ? '+' : '-'}</span>
        <span className={className}>{`${percentage.toFixed(3)}%`}</span>
      </h4>
      <DonutChart data={data} dataLabel="description" dataKey="description" dataValue="value" />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  item: getBudgetItem(state, ownProps),
  flow: getFlowAsTransaction(state, ownProps),
});

export default compose(withRouter, connect(mapStateToProps))(BudgetItem);
