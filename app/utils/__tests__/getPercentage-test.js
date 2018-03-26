import getPercentage from '../getPercentage';

describe('getPercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(getPercentage(50, 100)).toEqual(50);
    expect(getPercentage(50, 0)).toEqual(Infinity);
  });
});
