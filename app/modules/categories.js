// @flow
import { categoriesById } from './defaults';

/**
 * Types
 */
export type Categories = { +[key: string]: string };

/**
 * Reducer
 */
export default function categoriesReducer(state: Categories = categoriesById) {
  return state;
}
