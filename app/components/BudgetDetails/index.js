// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { PieChart } from 'react-easy-chart';
import { FormattedAmount } from 'modules/formattedAmount';
import { computePercent, absNumber } from 'utils/amoutAndNumbers';
import { getTransaction, getFormattedInflowBalance, getFormattedOutflowBalance } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import GoBack from './BackButton';
import style from './style.scss';

type BudgetItemProps = {
  transaction: Transaction[],
  inflow: FormattedAmount,
  outflow: FormattedAmount,
};

export const BudgetDetails = (props: BudgetItemProps) => {
  const { match: { params: { desc } } } = props.routeProps;
  console.log('props', props);
  const description = desc.replace(/-/g, ' ');
  const transactionValue = absNumber(props.transaction.value);
  const isNeg = transactionValue < 1;
  const getValUtil = (truthy, falsy) => isNeg ? truthy : falsy;
  const getColor = getValUtil(style.neg, style.pos);
  const pieColor = getValUtil('#eb2a2a', '#189c2d');
  const getTotalTransaction = getValUtil(absNumber(props.outflow.text), absNumber(props.inflow.text));
  const percentage = computePercent(transactionValue, getTotalTransaction).toFixed(2);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{description}</title>
      </Helmet>
      <section>
        <h1>{description}</h1>
        <GoBack />
        <p className={getColor}>
          <span className={style.bold}>{`${getValUtil('', '+')} ${percentage}%`} </span>{` is ${getValUtil(' spent ',' received ')} on ${description}`}
        </p>
        <PieChart
          labels
          size={300}
          data={[
            { key: transactionValue, value: [Math.abs(transactionValue)], color: pieColor },
            { key: '', value: getTotalTransaction, color: '#ccc' },
          ]}
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps),
  inflow: getFormattedInflowBalance(state),
  outflow: getFormattedOutflowBalance(state),
});

export default connect(mapStateToProps)(BudgetDetails);
