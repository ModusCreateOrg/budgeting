import getPercentage from '../getPercentage';

describe('getPercentage', () => {
  it('should return percentage 2 decimal places', () => {
    const result = (0.33 / 80) * 100;

    expect(getPercentage(0.33, 80)).toEqual(result.toFixed(2));
  });

  it('should return rounded up percentage', () => {
    const result = (2.43 / 80) * 100;

    expect(getPercentage(2.43, 80)).toEqual(Math.round(result));
  });
});
