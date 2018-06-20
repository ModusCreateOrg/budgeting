// @flow
import * as React from 'react';
import formatPercentage from 'utils/formatPercentage';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';
import DonutChart from 'components/DonutChart';

type BudgetPercentageProps = {
  transaction: Transaction,
  inflows: number,
};
function createData(transaction,percent){
    var data = [];
    var item1 = {
        name : transaction.description,
        value : Math.abs(percent),
        id : 1,
        type: "percentage"
    };
    data.push(item1);
    var item2 = {
        name : "Remaining",
        value : 100-Math.abs(percent),
        id : 2,
        type: "percentage"
    };
    data.push(item2);
    return data;
}
const BudgetPercentage = ({ transaction, inflows }:BudgetPercentageProps) => {
    
  const { id, categoryId, description } = transaction;
  const percent = formatPercentage(transaction.value,inflows,categoryId);
  const percentCls = percent.isNegative ? styles.neg : styles.pos;
  var data = createData(transaction,percent.value);
  return (
      <div>
        <h3 className={percentCls}>{percent.text}</h3>
        <DonutChart data={data} dataLabel="name" dataKey="id"/>
    </div>
  );
};

export default BudgetPercentage;
