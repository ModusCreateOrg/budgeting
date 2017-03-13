import {
  categoriesById
} from './defaults';


/**
 * Action Constansts
 */


/**
 * Actions
 */


/**
 * Helpers
 */


/**
 * Selectors
 */
export const getCategories = state => state.categories;


/**
 * Reducer
 */
export default function categoriesReducer(state = categoriesById) {
  return state;
}
