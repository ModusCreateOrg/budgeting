import {
  defaultSummary
} from './defaults';

const REQUEST_SUM = 'budgeting-sample-app/summary/REQUEST_SUM';

export const actions = {
  requestSum: data => ({
    type: REQUEST_SUM,
    data
  })
};

/**
 * Summary calculation
 * @param  {Object} state  Current state
 * @param  {Object} action Dispatched action
 * @return {Object}        Default state
 */
export default function reducer(state = defaultSummary, action) {
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
