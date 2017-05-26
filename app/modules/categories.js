// @flow
import { categoriesById } from './defaults';

/**
 * Types
 */
export type Category = { [key: string]: string };

/**
 * Reducer
 */
export default function categoriesReducer(state: Category = categoriesById) {
  return state;
}
