import { getPath } from '../location';

describe('getPath', () => {
  it('should return an array of strings consisting with the path', () => {
    const state = {
      location: {
        pathname: '/testing/the/path/5',
      },
    };
    const expectedResult = ['', 'testing', 'the', 'path', '5'];

    expect(getPath(state)).toEqual(expectedResult);
  });

  it('should return empty array if the state has no path', () => {
    const state = {};
    const expectedResult = [];

    expect(getPath(state)).toEqual(expectedResult);
  });
});
