import {
  DEFAULT_CATEGORY_ID,
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

export const getDefaultCategoryId = () => DEFAULT_CATEGORY_ID;


/**
 * Reducer
 */
export default function categoriesReducer(state = categoriesById) {
  return state;
}
