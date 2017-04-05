import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import categories, { applyCategoryName, getCategories } from './categories';
import transactionGrid from './transactionGrid';
import transactions, { getOutflowByCategory } from './transactions';


/**
 * Selectors
 */
export const getOutflowByCategoryName = createSelector(
  getOutflowByCategory,
  getCategories,
  (trans, cat) => applyCategoryName(trans, cat)
);


/**
 * Routing to be implemented
 */
export default combineReducers({
  categories,
  transactionGrid,
  transactions,
});
