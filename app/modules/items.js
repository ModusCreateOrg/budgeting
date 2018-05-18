// @flow
import {Transaction} from 'modules/transactions';

/**
 * Types
 */
export type ItemDetails = { 
    transaction : Transaction,
    ratio : number,
    isInflow : boolean,
    totalFlowValue : number
};

/**
 * Reducer
 */
export default function itemsReducer(state: ItemDetails = {}) {
  return state;
}
