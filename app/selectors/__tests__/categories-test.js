import { getCategories, getDefaultCategoryId } from '../categories';

describe('getCategories', () => {
  it('should return all categories in the state', () => {
    const state = {
      categories: {
        1: 'Groceries',
        2: 'School',
      },
    };
    const expectedSelection = {
      1: 'Groceries',
      2: 'School',
    };

    expect(getCategories(state)).toEqual(expectedSelection);
  });

  it('should return empty object if the state has no categories', () => {
    const state = {};
    const expectedSelection = {};

    expect(getCategories(state)).toEqual(expectedSelection);
  });
});

describe('getDefaultCategoryId', () => {
  it('should return default category ID', () => {
    expect(getDefaultCategoryId()).toEqual('16');
  });
});
