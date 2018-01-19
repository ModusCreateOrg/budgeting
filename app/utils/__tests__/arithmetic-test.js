import { roundUp } from '../arithmetic';

describe('roundUp', () => {
  it('should round positive value up to 3 decimal places', () => {
    const pi = 3.14159265359;
    const result = roundUp(pi, 3);
    expect(result - 3.142).toBeLessThan(Number.EPSILON);
  });

  it('should return zero when value is zero', () => {
    const result = roundUp(0, 3);
    expect(result).toEqual(0);
  });

  it('should round negative value up to 3 decimal places', () => {
    const pi = -3.14159265359;
    const result = roundUp(pi, 3);
    expect(Math.abs(result) - 3.142).toBeLessThan(Number.EPSILON);
  });
});
