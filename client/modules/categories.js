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
export const applyCategoryName = (transactions, categories) => {
  return transactions.map((transaction) => {
    transaction.category = categories[transaction.categoryId];
    return transaction;
  });
};

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
