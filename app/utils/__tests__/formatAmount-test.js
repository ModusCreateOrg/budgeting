import formatAmount, { formatPercentageAmount } from '../formatAmount';

describe('formatAmount', () => {
  describe('when value is positive', () => {
    it('should format the value to correct $ amount', () => {
      const expected = { text: '$110.00', isNegative: false };
      const actualValue = 110;
      expect(formatAmount(actualValue)).toEqual(expected);
    });

    it('should format the value to correct percentage based on inflow', () => {
      const inflow = 100;
      const outflow = 50;
      const actualValue = 10;

      const expected = { text: '+10.00% of $100.00 (inflow)', isNegative: false };
      expect(formatPercentageAmount(actualValue, inflow, outflow)).toEqual(expected);
    });
  });
  describe('when value is negative', () => {
    it('should format the value to correct $ amount', () => {
      const expected = { text: '-$110.00', isNegative: true };
      const actualValue = -110;
      expect(formatAmount(actualValue)).toEqual(expected);
    });

    it('should format the value to correct percentage based on outflow', () => {
      const inflow = 100;
      const outflow = 50;
      const actualValue = -10;

      const expected = { text: '-20.00% of $50.00 (outflow)', isNegative: true };
      expect(formatPercentageAmount(actualValue, inflow, outflow)).toEqual(expected);
    });
  });
});
