// @flow
import { createSelector } from 'reselect';
import type { State } from 'modules/rootReducer';
import type { Categories } from 'modules/categories';

const DEFAULT_CATEGORY_ID: string = '16';

export const getCategories = (state: State): Categories => state.categories || {};

export const getDefaultCategoryId = (): string => DEFAULT_CATEGORY_ID;

export const getCategoryById = id => createSelector(getCategories, categories => categories[id]);
