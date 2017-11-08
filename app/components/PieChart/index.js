// @flow

import * as React from 'react';
import DonutChart from 'components/DonutChart';
import { arc } from 'd3';


export default class PieChart extends DonutChart {

    getPathArc = () => {
        const { height, innerRatio, isPercentage } = this.props;
        return arc()
            .innerRadius(0)
            .outerRadius(height / 2);
    };

}
 