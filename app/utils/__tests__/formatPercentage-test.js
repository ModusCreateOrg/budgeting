import formatPercentage from '../formatPercentage';

describe('formatPercentage utility function', () => {
  it('correctly handles a basic format', () => {
    const valueToFormat = 345.34564;

    const result = formatPercentage(valueToFormat);

    expect(result).toBe('345.35%');
  });

  it('correctly handles a format with custom decimal places', () => {
    const valueToFormat = 12356.345789;

    const result = formatPercentage(valueToFormat, {
      decimals: 4,
    });

    expect(result).toBe('12356.3458%');
  });

  it('correctly handles negative values', () => {
    const valueToFormat = -1234.823;

    const result = formatPercentage(valueToFormat, {
      decimals: 1,
    });

    expect(result).toBe('-1234.8%');
  });

  it('correctly adds decimals even if not necessary', () => {
    const valueToFormat = 555;

    const result = formatPercentage(valueToFormat, {
      decimals: 3,
    });

    expect(result).toBe('555.000%');
  });
});
