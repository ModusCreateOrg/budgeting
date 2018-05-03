import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from 'selectors/categories';
import {
    getTransactions,
    getInflowBalance,
    getOutflowBalance
  } from 'selectors/transactions';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import PieChart from 'components/PieChart';
import styles from './style.scss';
import backbutton from 'images/back.svg';

class BudgetItem extends React.Component {
    render() {
        let itemId = history.state.state.id;
        let transaction = this.props.transactions.filter(function(item){
            return item.id == itemId
        })[0];    
        const amount = formatAmount(transaction.value);
        let amountCls, chartFillColor;
        const sign = amount.isNegative ? '-' : '+';
        let percentage = 0;
        if(amount.isNegative){
            percentage = ((parseFloat(transaction.value)/this.props.outflow) * 100).toFixed(2);
            amountCls = styles.neg;
            chartFillColor = "#eb2a2a";
        }
        else{
            amountCls = styles.pos;
            percentage = ((parseFloat(transaction.value)/this.props.inflow) * 100).toFixed(2);
            chartFillColor = "#189c2d";
        }
        const category = this.props.categories[transaction.categoryId];
        let chartData = [];
        let otherColor = "#000";
        chartData.push({title: "Other", value: 100-(+(percentage)), color: otherColor})
        chartData.push({title: category, value: +(percentage), color: chartFillColor});
        return (
            <div className={styles.budgetItem}>
                <Link to="/budget" className={styles.back}><img src={backbutton} /></Link>
                <h1>{category + ' - ' + transaction.description + ' (' + amount.text+ ')'}</h1>
                <h2 className={amountCls}><span>{sign}</span><span>{percentage+"%"}</span></h2>
                <PieChart data={chartData} />;
            </div>
        );
    }
}

const mapStateToProps = state => ({
    transactions : getTransactions(state),
    categories : getCategories(state),    
    inflow : getInflowBalance(state),
    outflow : getOutflowBalance(state)
  });
export default connect(mapStateToProps)(BudgetItem);