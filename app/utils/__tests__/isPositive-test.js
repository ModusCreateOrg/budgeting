import isPositive from '../isPositive';

describe('isPositive', () => {
  it('should determine if the number is positive', () => {
    expect(isPositive(50)).toBeTruthy();
    expect(isPositive(0)).toBeTruthy();
    expect(isPositive(-1)).toBeFalsy();
  });
});
