import {
  defaultTransactionGridFields,
} from './defaults';


/**
 * Action Constants
 */
const GET_TRANSACTION_GRID_FIELDS = 'budget/transactionGrid/GET_FIELDS';


/**
 * Actions
 */


/**
 * Helpers
 */


/**
 * Reducer
 * Reserved for future use. Intended for dynamic grid column setup
 */
export default function transactionGridReducer(state = defaultTransactionGridFields, action) {
  switch (action.type) {
    case GET_TRANSACTION_GRID_FIELDS:
      return state;
    default:
      return state;
  }
}
