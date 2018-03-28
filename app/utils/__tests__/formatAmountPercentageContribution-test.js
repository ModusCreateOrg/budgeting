import formatAmountPercentageContribution from '../formatAmountPercentageContribution';

describe('formatAmountPercentageContribution', () => {
  it('should show correctly percentage contribution', () => {
    expect(formatAmountPercentageContribution(50, 100)).toEqual({
      text: '+50.00%',
      isNegative: false,
    });
  });

  it('should show percentage contribution with positive sign', () => {
    expect(formatAmountPercentageContribution(50, 100)).toEqual({
      text: '+50.00%',
      isNegative: false,
    });
  });

  it('should show percentage contribution with negative sign', () => {
    expect(formatAmountPercentageContribution(-50, 100)).toEqual({
      text: '-50.00%',
      isNegative: true,
    });
  });

  it('should show percentage contribution without negative sign', () => {
    expect(formatAmountPercentageContribution(-50, 100, 2, false)).toEqual({
      text: '50.00%',
      isNegative: true,
    });
  });

  it('should show percentage contribution without positive sign', () => {
    expect(formatAmountPercentageContribution(50, 100, 2, false)).toEqual({
      text: '50.00%',
      isNegative: false,
    });
  });

  it('should show percentage contribution without plus symbol when positive sign', () => {
    expect(formatAmountPercentageContribution(50, 100, 2, false, false)).toEqual({
      text: '50.00%',
      isNegative: false,
    });
  });

  it('should show percentage contribution with precision', () => {
    expect(formatAmountPercentageContribution(50, 100, 3)).toEqual({
      text: '+50.000%',
      isNegative: false,
    });
  });
});
