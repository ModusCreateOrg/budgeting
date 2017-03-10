import { combineReducers } from 'redux';

import categories from './categories';
import summary from './summary';
import transactionGrid from './transactionGrid';
import transactions from './transactions';

/**
 * Routing to be implemented
 */
export default combineReducers({
  categories,
  summary,
  transactionGrid,
  transactions,
});
