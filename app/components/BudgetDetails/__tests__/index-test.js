import { computePercent } from 'utils/amoutAndNumbers';

describe('Test cases for BudgetDetails', () => {
  it('should compute percentage', () => {
    expect(computePercent(10, 100)).toBe(10);
  });
});
