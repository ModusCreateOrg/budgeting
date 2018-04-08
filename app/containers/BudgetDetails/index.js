// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions, getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import { Pie as PieChart } from 'react-chartjs';
import { Link } from 'react-router-dom';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

type BudgetDetailsProps = {
  transaction: Transaction,
  categories: Object,
};

export class BudgetDetails extends React.Component<BudgetDetailsProps> {
  static defaultProps = {
    transaction: Object,
    categories: Object
  };

  /**
   * Retuns data for PieChart
   */
  getPieData(): Transaction[] {
    const { transaction, categories, totalInFlow, totalOutFlow } = this.props;
    let finalData = [];
    if(transaction.value < 0) {
      finalData.push({
        value: Math.abs(transaction.value).toFixed(2),
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: categories[transaction.categoryId]
      });

      finalData.push({
        value: (Math.abs(totalOutFlow) - Math.abs(transaction.value)).toFixed(2),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Other Outflow"
      });
    } else {
      finalData.push({
        value: transaction.value.toFixed(2),
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: categories[transaction.categoryId]
      });

      finalData.push({
        value: (totalInFlow - transaction.value).toFixed(2),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Other Inflow"
      });
    }

    return finalData;
  }

  /**
   * Returns Calculated Percentage of item contribution to budget
   * Inflow Or Outflow
   */
  getInflowOutFlowPercentage() {

    const { transaction, totalInFlow, totalOutFlow } = this.props;
    let percentage = 0;

    if(transaction.value < 0) {
      percentage = -(100 * transaction.value) / totalOutFlow;
    } else {
      percentage = (100 * transaction.value) / totalInFlow;
    }

    return percentage.toFixed(2);
  }

  render() {

    const { transaction, categories, totalInFlow, totalOutFlow } = this.props;

    return (
      <div>
        <Link to={'/budget'}>Back</Link>
        <h1>{categories[transaction.categoryId]}</h1>
        <h3 className={ (transaction.value < 0) ? styles.redtxt :styles.greentxt }>{transaction.description} { this.getInflowOutFlowPercentage() }%</h3>
        <div className={styles.chartwrapper}>
          <PieChart redraw data={this.getPieData()} options={ {responsive:true} }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  transaction: getTransactionById(state, props.id),
  categories: getCategories(state),
  totalInFlow: getInflowBalance(state),
  totalOutFlow: getOutflowBalance(state)
});

export default connect(mapStateToProps)(BudgetDetails);
