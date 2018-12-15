import React from 'react';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import style from './style.scss';

const DetailsView = ({ transaction, category, goBack, totalIn, totalOut }) => {
  const description = (transaction && transaction.description) || '';
  const value = (transaction && transaction.value) || 0;
  const totalValue = value > 0 ? totalIn : totalOut;

  const formattedAmount = formatAmount(value).text;
  const valueAbs = Math.abs(value);
  const totalAbs = Math.abs(totalValue);

  const chartData = [
    {
      category: category,
      categoryId: 1,
      value: valueAbs,
    },
    {
      category: 'Other',
      categoryId: 2,
      value: totalAbs,
    },
  ];

  return (
    <div className={style.details}>
      <div className={style.details__header}>
        <button type="button" className={`${style.btn} ${style.btnDefault}`} onClick={goBack}>
          Go back to list
        </button>
      </div>
      {transaction && (
        <React.Fragment>
          <h1>Description: {description}</h1>
          <h2 className={transaction.value > 0 ? style.pos : style.neg}>Value: {formattedAmount}</h2>
          <br />
          <h5>Category: {category}</h5>
          <DonutChart data={chartData} dataLabel="category" dataKey="categoryId" innerRatio={999} useFormat={false} />
        </React.Fragment>
      )}
    </div>
  );
};

export default DetailsView;
