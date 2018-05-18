import React from "react";
import ReactSvgPieChart from "react-svg-piechart";
import styles from './styles.scss';

type ChartData = [{
    title: string,
    value: number,
    color: string
}];

class PieChart extends React.Component<ChartData> {
    render() {
        return(<ReactSvgPieChart data={this.props.data} expandOnHover />);
    }
}

export default PieChart;