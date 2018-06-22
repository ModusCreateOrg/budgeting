// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import type { Transaction }  from 'modules/transactions';
import DonutChart from 'components/DonutChart';
import categoryReducer from 'modules/categories';
import formatAmount from 'utils/formatAmount';
import getPercentage from 'utils/getPercentage';
import { injectAsyncReducers } from 'store';
import utils from 'theme/_utilities.scss';
import styles from './style.scss';
import {
  getTransactions,
  getTransactionById,
  totalTransactions,
} from 'selectors/transactions';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type History = { goBack: Function };

type BudgetItemProps = {
  transactions: Transaction[],
  match: Object,
  totalBudget: number,
  history: History,
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultProps = {
    transactions: [],
    match: {},
    totalBudget: 0,
    history: { goBack: () => undefined },
  };

  constructor(props) {
    super(props);

    this.state = {
      transaction: undefined,
      chartData: {},
    };

    this.getTransactionAndChartData = this.getTransactionAndChartData.bind(this);
  }

  componentWillMount() {
    this.getTransactionAndChartData();
  }

  componentWillReceiveProps(nextProps: BudgetItemProps) {
    const { id: nextId } = nextProps.match.params;
    const { params: { id } } = this.props.match;

    if (id !== nextId) {
      this.getTransactionAndChartData(nextProps);
    }
  }

  /**
   * Fetches a particular transaction item as well as data for Pie Chart
   * @param  {BudgetItemProps} props Component props
   */
  getTransactionAndChartData(props: BudgetItemProps = this.props) {
    const { transactions, totalBudget, match: { params } } = props;
    const transaction = getTransactionById(transactions, Number(params.id));

    if (transaction) {
      const absValue = Math.abs(transaction.value);
      const chartData = [
        { ...transaction, value: absValue },
        {
          description: 'Total Budget',
          value: totalBudget - absValue,
          categoryId: 'total',
        },
      ];

      this.setState(() => ({ transaction, chartData }));
    }
  }

  render() {
    const { history, totalBudget } = this.props;
    const { transaction, chartData } = this.state;

    if (!transaction) {
      return null;
    }

    const amount = formatAmount(transaction.value);
    const amountClass = amount.isNegative ? utils.neg : utils.pos;
    const percentage = getPercentage(transaction.value, totalBudget);

    return (
      <section>
        <div className={styles.detailsWrapper}>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => history.goBack()}
            >
              Go Back
            </button>
          </div>
          <div className={styles.itemDetails}>
            <div>
              <h3 className={utils.m0}>
                <span>{`${transaction.description} - `}</span>
                <span className={amountClass}>
                  {amount.text.replace(/(\-)/g, '')}
                </span>
              </h3>

              <p className={amountClass}>
                {`${amount.isNegative ? '-' : '+'} ${percentage}%`}
              </p>
            </div>

            <DonutChart
              data={chartData}
              dataLabel="description"
              dataKey="categoryId"
              showLegend={false}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  totalBudget: totalTransactions(getTransactions(state), true),
});

export default connect(mapStateToProps)(BudgetItem);
