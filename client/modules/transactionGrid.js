import {
  defaultTransactionGridFields,
} from './defaults';

const GET_TRANSACTION_GRID_FIELDS = 'budgeting-sample-app/transactionGrid/GET_TRANSACTION_GRID_FIELDS';

/**
 * Reserved for future use.
 * Intended for dynamic grid column setup
 * @param  {Object} state  Current state
 * @param  {Object} action Dispatched action
 * @return {Object}        Default state
 */
export default function reducer(state = defaultTransactionGridFields, action) {
  switch (action.type) {
    case GET_TRANSACTION_GRID_FIELDS:
      return state;
    default:
      return state;
  }
}
