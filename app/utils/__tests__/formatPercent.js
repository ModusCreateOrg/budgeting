import formatPercent from '../formatPercent';

describe('formatPercent', () => {
  it('formats with positive sign', () => {
    expect(formatPercent(0.5)).toEqual('+50.00%');
  });

  it('formats with negative sign', () => {
    expect(formatPercent(-0.5)).toEqual('-50.00%');
  });
});
