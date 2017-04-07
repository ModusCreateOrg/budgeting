const DEFAULT_CATEGORY_ID = '16';

export const getCategories = state => state.categories || [];

export const getDefaultCategoryId = () => DEFAULT_CATEGORY_ID;
