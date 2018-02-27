import getQueryParam from '../queries';

describe('getQueryParam', () => {
  it('should return a query param value', () => {
    const match = {
      params: {
        id: 1,
        description: 'test',
      },
    };
    const expectedSelection = 1;

    expect(getQueryParam(match, 'id')).toEqual(expectedSelection);
  });

  it('should return null if the query param cannot be found', () => {
    const match = {};

    expect(getQueryParam(match, 'id')).toEqual(null);
  });
});
