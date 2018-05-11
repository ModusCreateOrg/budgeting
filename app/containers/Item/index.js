import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import PieChart from 'components/PieChart';
import ItemHeader from './itemHeader';
import styles from './styles.scss';

export class ItemContainer extends React.Component {
  render() {
    const { transaction, inflow, outflow } = this.props;
    const itemValue = Math.abs(transaction.value);
    const absInflow = Math.abs(inflow);
    const absOutflow = Math.abs(outflow); // Needs to be absolute value, to always get the positive percentage
    const inflowPercentage = itemValue * 100 / absInflow;
    const outflowPercentage = itemValue * 100 / absOutflow;
    const budget = absInflow + absOutflow;
    const partOfBudget = (itemValue * 100 / Math.abs(budget)).toFixed(2);
    const data = [
      { id: 1, name: transaction.description, value: partOfBudget }, // Contribution of the item on total budget
      { id: 2, name: 'Others', value: 100 - partOfBudget }, // Remainig part of the pie chart
    ];
    return (
      <section>
        {this.props.history && (
          <button onClick={this.props.history.goBack} className={styles.backButton}>
            Go Back
          </button>
        )}
        {/* Render the header, should pass the values in percentage */}
        <ItemHeader name={transaction.description} inflow={inflowPercentage} outflow={outflowPercentage} />
        <div className={styles.chart}>
          <PieChart data={data} dataLabel="name" dataKey="value" type="percentage" />
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state, props) => ({
  transaction: getTransactionById(state, Number(props.match.params.itemId)),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(ItemContainer);
