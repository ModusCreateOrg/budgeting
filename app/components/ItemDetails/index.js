// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';

import styles from './style.scss';

type ItemDetailsProps = {
  transaction: Transaction,
};

const ItemDetails = ({ transaction }: ItemDetailsProps) => {
  const { id, categoryId, description, value, contribution } = transaction;

  const amount = formatAmount(value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;

  return (
    <div>
      <div>{description}</div>
      <div>
        <span className={amountCls}>{amount.isNegative ? `-${contribution}%` : `+${contribution}%`}</span>
      </div>
    </div>
  );
};

export default ItemDetails;
