import {
  defaultSummary
} from './defaults';


/**
 * Action Constants
 */
const REQUEST_SUM = 'budget/summary/REQUEST_SUM';


/**
 * Actions
 */
export const actions = {
  requestSum: data => ({
    type: REQUEST_SUM,
    data
  })
};


/**
 * Helpers
 */


/**
 * Reducer
 */
export default function summaryReducer(state = defaultSummary, action) {
  let sum;
  switch (action.type) {
    case REQUEST_SUM:
      sum = action.data.reduce((prev, current) => (
        { value: prev.value + current.value }
      ));

      sum = { value: Math.round(sum.value * 100) / 100 };

      // Return ES2015 friendly
      // or stage-0 {...state, ...sum}
      return Object.assign({}, state, sum);
    default:
      return state;
  }
}
