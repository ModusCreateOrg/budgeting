// @flow

import * as React from 'react';
import styles from './style.scss';
import PieChart from 'components/PieChart';
import type { TransactionSummary } from 'selectors/transactions';

type BudgetDetailProps = {
    itemPercentage: string,
    itemValue: string,
    itemTitle: string,
    isOutflow: boolean,
    total: number,
    goBack: () => void,

};

const BudgetDetails = ({ itemPercentage, itemValue, itemTitle, isOutflow, total, goBack }: BudgetDetailProps) => {

    const sign = isOutflow ? <span className={styles.negative}>-</span> : null

    const pieData = [
        {
            value: parseFloat(itemPercentage),
            category: itemTitle,
            categoryId: ""
        },
        {
            value: 100 - parseFloat(itemPercentage),
            category: "Others",
            categoryId: ""
        }
    ]

    return (
        <section>
            <span className={styles.back} onClick={goBack}>{"<"} Back</span>
            <h1>{itemTitle} : ${itemValue}</h1>
            <h2>{sign}{itemPercentage}%</h2>
            <PieChart data={pieData} dataLabel="category" dataKey="category" isPercentage={true} />
        </section>
    );
};

export default BudgetDetails;
