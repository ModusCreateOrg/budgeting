// @flow
const DEFAULT_CATEGORY_ID: string = '16';

export const getCategories = (state: Object) => state.categories || {};

export const getDefaultCategoryId = ():string => DEFAULT_CATEGORY_ID;
