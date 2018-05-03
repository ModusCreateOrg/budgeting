// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBudgetItem, getTransactionFlow } from 'selectors/transactions';
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
        <button className={style.button}>⬅ Back</button>
      </Link>
      <h2 className={style.heading}>{description}</h2>
      <h4 className={style.percentage}>
        <span className={className}>{positiveFlow ? '+' : '-'}</span>
        <span className={className}>{`${percentage.toFixed(2)}%`}</span>
      </h4>
      <DonutChart data={data} dataLabel="description" dataKey="description" dataValue="value" />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  item: getBudgetItem(state, ownProps),
  flow: getTransactionFlow(state, ownProps),
});

export default compose(withRouter, connect(mapStateToProps))(BudgetItem);
