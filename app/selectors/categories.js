// @flow
import type { State } from 'modules/rootReducer';
import type { Categories } from 'modules/categories';

const DEFAULT_CATEGORY_ID: string = '16';

export const getCategories = (state: State): Categories => state.categories || {};

export const getDefaultCategoryId = (): string => DEFAULT_CATEGORY_ID;
