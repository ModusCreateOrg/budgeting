// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import formatAmount from 'utils/formatAmount';
import percentage from 'utils/percentage';
import type { Transaction } from 'modules/transactions';
import {
  getFormattedBalance,
  getFormattedInflowBalance,
  getFormattedOutflowBalance,
  getItemById,
  sortTransactions,
  getOutflowByCategoryName,
} from 'selectors/transactions';

import PieChart from 'components/PieChart';

import styles from './style.scss';

type BudgetDetailProps = {
  item: Transaction[],
  id: 3,
  match: Object,
  history: Object,
  inflow: number,
  outflow: number,
};

class BudgetDetail extends React.Component<BudgetDetailProps> {
  render() {
    const { id, match, item, inflow, history } = this.props;

    if(!item || item.id === null){
      history.push("/budget");
    };

    let budget = parseFloat(inflow.text.replace(/[^0-9\.-]+/g,""));

    let value = percentage(item.value, budget, true);
    let itemValue = Math.abs(item.value);

    const main = {
      key: `key-${item.id}`,
      description: item.description,
      value: itemValue,
    };

    let data = [
      main,
      {
        key: 'key-last',
        description: 'Remaining Budget',
        value: budget - itemValue,
      },
    ];

    return (
      <div className={styles.budgetContainer}>
        <header className={styles.header}>
          <button className={styles.button} type={'button'} onClick={() => this.props.history.goBack()}>
            Back
          </button>
          <div className={styles.titleContainer}>
            <h2>{item.description ? item.description : ''}</h2>
            <h4 className={value.isNegative ? styles.red : styles.green}>{value.text}</h4>
          </div>
        </header>
        <div  className={styles.marginSmall}>
          <PieChart dataKey="key" data={data} dataLabel="description" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  inflow: getFormattedInflowBalance(state),
  item: getItemById(state, parseInt(props.match.params.id)),
});

export default withRouter(connect(mapStateToProps)(BudgetDetail));
