import React from 'react';
import formatAmount from 'utils/formatAmount';
import style from './style.scss';

const DetailsView = ({ transaction, category, goBack, totalIn, totalOut }) => {
  const description = (transaction && transaction.description) || '';
  const value = (transaction && transaction.value) || 0;

  const formattedAmount = formatAmount(value).text;
  const totalValueAbs = Math.abs(value);
  const totalAbs = Math.abs(value > 0 ? totalIn : totalOut);

  return (
    <div className={style.details}>
      <div className={style.details__header}>
        <button type="button" className={`${style.btn} ${style.btnDefault}`} onClick={goBack}>
          Go back to list
        </button>
      </div>
      {transaction && (
        <React.Fragment>
          <h1>{description}</h1>
          <h2 className={transaction.value > 0 ? style.pos : style.neg}>{formattedAmount}</h2>
          <br />
          <h5>Category: {category}</h5>
          <h5>
            {totalValueAbs} / {totalAbs}
          </h5>
        </React.Fragment>
      )}
    </div>
  );
};

export default DetailsView;
