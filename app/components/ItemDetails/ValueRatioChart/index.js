import React from 'react';
import DonutChart from 'components/DonutChart';
import {ItemDetails} from 'modules/items';

const ValueRatioChart = ({transaction, totalFlowValue} : ItemDetails) => {
    
    const data = [{...transaction, value : Math.abs(transaction.value)}, {description : "Other items", value : Math.abs(totalFlowValue - transaction.value)}];

    return (
        <DonutChart data={data} dataLabel="description" dataKey="description"/>
    );
}

export default ValueRatioChart;