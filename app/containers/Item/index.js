// @flow
import * as React from 'react';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import ItemDescription from 'containers/ItemDescription';
import ItemContribution from 'containers/ItemContribution';
import type { Match } from 'react-router';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});
type ItemContainerProps = {
  match: Match,
};

const ItemContainer = ({ match: { params: { itemId } } }: ItemContainerProps) => (
  <section>
    <ItemDescription itemId={itemId} />
    <ItemContribution itemId={itemId} />
  </section>
);

export default ItemContainer;
