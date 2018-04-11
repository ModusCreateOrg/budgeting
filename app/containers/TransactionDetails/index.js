// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PieChart from 'components/PieChart';
import styles from './style.scss';
import { getInflowBalance, getOutflowBalance } from 'selectors/transactions';

export class TransactionDetails extends React.Component {

    render() {
        const { transaction } = this.props.location.state;
        const { inflow, outflow } = this.props;

        const amount = transaction.value;
        const isNegative = amount < 0;
        const amountClass = isNegative ? styles.neg : styles.pos;

        const percentage = (Math.abs(amount) / (inflow + outflow) * 100).toFixed(2);

        const data = [
            { percentage: percentage },
            { percentage: 100 - percentage }
        ];

        return (
            <div className={styles.transactionDetails} >
                <button onClick={this.props.history.goBack}>Back</button>
                <h1>{transaction.description}</h1>
                <h2 className={amountClass}>
                    {isNegative ? '-' : '+'}
                    {percentage}%
                </h2>
                <PieChart data={data} dataLabel="%" dataKey="value" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state)),
});

export default withRouter(connect(mapStateToProps)(TransactionDetails));
