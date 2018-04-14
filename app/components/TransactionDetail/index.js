// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import renderPieChart, { getTransactionColor } from './PieChart';
import style from './style.scss';

export type TransactionProps = {
  description: string,
  category: string,
  value: number,
  difference: number,
  percentage: string,
  isInflow: boolean,
};

const Detail = ({ description, value, difference, category, percentage, isInflow }) => (
  <div>
    <h1>{description}</h1>
    <h3>{category}</h3>
    <p style={{ color: getTransactionColor(isInflow), fontWeight: 'bold' }}>{percentage}</p>
    {renderPieChart(description, value, difference, isInflow)}
  </div>
);

const NotFound = () => (
  <div>
    <p>Transaction Not Found...</p>
  </div>
);

const TransactionDetail = (props: TransactionProps) => (
  <div className={style.detail}>
    <Link to={`/budget`}>Go Back</Link>
    {props.description ? <Detail {...props} /> : <NotFound />}
  </div>
);

export default TransactionDetail;
