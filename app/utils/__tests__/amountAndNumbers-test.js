import { computePercent, absNumber } from '../amoutAndNumbers'

describe('Percentage computation', () => {
  it('should return a number given a string number', () => {
    expect(absNumber('10.00')).toBe(10.00)
  });
  it('should find the percentage relative to the bigger number', () => {
    // Test case for even number
    expect(computePercent(10, 100)).toBe(10.00);
    // Test case for odd/float number
    expect(computePercent(3, 27)).toBe(11.11);
  })
})