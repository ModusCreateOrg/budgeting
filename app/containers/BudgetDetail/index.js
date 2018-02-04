// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import percentage from 'utils/percentage';
import type { Transaction } from 'modules/transactions';
import { getFormattedInflowBalance, getItemById } from 'selectors/transactions';

import PieChart from 'components/PieChart';

import styles from './style.scss';

type BudgetDetailProps = {
  item: Transaction,
  match: Object,
  history: Object,
  inflow: number,
};

class BudgetDetail extends React.Component<BudgetDetailProps> {
  render() {
    const { item, inflow, history } = this.props;

    if (!item || item.id === null) {
      history.push('/budget');
      return null;
    }

    const budget = parseFloat(inflow.text.replace(/[^0-9.-]+/g, ''));
    const value = percentage(item.value, budget, true);
    const itemValue = Math.abs(item.value);

    const main = {
      key: `key-${item.id}`,
      description: item.description,
      value: itemValue,
    };

    const data = [
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
        <div className={styles.marginSmall}>
          <PieChart dataKey="key" data={data} dataLabel="description" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  inflow: getFormattedInflowBalance(state),
  item: getItemById(state, parseInt(props.match.params.id, 10)),
});

export default withRouter(connect(mapStateToProps)(BudgetDetail));
