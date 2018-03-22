// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import formatAmount from 'utils/formatAmount';
import styles from './style.scss';

import DonutChart from 'components/DonutChart';
import { scaleOrdinal } from 'd3';


class TransactionContainer extends React.Component<{}> {

    render() {
        const item = this.props.transactions.find(i => { return i.id.toString() === this.props.match.params.id })
        const isNegative = item.value < 0;
        const percentCls = isNegative ? styles.negative: styles.positive;
        const percent = ((item: Transaction) => {
            if (isNegative) {
                return (item.value * 100) / this.props.outflow;
            }
            return (item.value * 100) / this.props.inflow;
        })(item);
        const data = [
            {
                label: item.description,
                key: 1,
                value: percent * 0.01,
                options: {
                    percent: true
                }
            },
            {
                label: isNegative ? 'Other Expenses': 'Other Incomes',
                key: 2,
                value: (100 - percent) * 0.01,
                options: {
                    percent: true
                }
            }
        ];
        const color = scaleOrdinal([isNegative ? styles.negativeColor : styles.positiveColor, '#91E586', '#B3C5C4']);

        return (
            <section>
                <h1>{item.description}</h1>
                <p className={percentCls}>{`%${percent.toFixed(2)}`}</p>

                <button className={styles.buttonBack} onClick={this.props.history.goBack}>{`<< Go Back`}</button>

                <DonutChart data={data} dataLabel="label" dataKey="key" color={color} />
            </section>
        )
    }

}

const mapStateToProps = state => ({
    transactions: getTransactions(state),
    inflow: getInflowBalance(state),
    outflow: getOutflowBalance(state)
});

export default connect(mapStateToProps)(TransactionContainer);
