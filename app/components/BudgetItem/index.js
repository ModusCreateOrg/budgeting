// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
	getTransactionById,
	getInflowBalance,
	getOutflowBalance
} from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import type { Transaction } from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import formatAmount from 'utils/formatAmount';
import getRelativePercentage from 'utils/getRelativePercentage';
import styles from './style.scss';

import DonutChart from 'components/DonutChart';
import NavLink from 'components/NavLink';

injectAsyncReducers({
	transactions: transactionReducer,
	categories: categoryReducer
});

type BudgetItemProps = {
	transaction: Transaction,
	categories: Object
};

export class BudgetItem extends React.Component<BudgetItemProps> {
	static defaultProps = {
		transaction: {},
		categories: {}
	};

	render() {
		const { transaction, categories, budgetItemId, inflow, outflow } = this.props;
		const { id, categoryId, description } = transaction;
		const category = categories[categoryId];
		const amount = formatAmount(transaction.value);
		const amountCls = amount.isNegative ? styles.neg : styles.pos;
    const total = amount.isNegative ? outflow : inflow;
    const percentage = getRelativePercentage(total, transaction, amount.isNegative);
		return (
			<section>
				<h1 className={styles.h1}>
					{transaction.description} ({category})
				</h1>
				<h4 className={amountCls}>{amount.text} ({percentage.relativePercentage})</h4>
        <DonutChart data={percentage.chartData} dataLabel="item" dataKey="itemId" />
        <div className={styles.buttonWrapper}>
          <NavLink to={`/budget`} label="Back to budget list" styles={styles} />
        </div>
			</section>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	transaction: getTransactionById(state, Number(ownProps.budgetItemId)),
	categories: getCategories(state),
	inflow: getInflowBalance(state),
	outflow: getOutflowBalance(state)
});

export default connect(mapStateToProps)(BudgetItem);
