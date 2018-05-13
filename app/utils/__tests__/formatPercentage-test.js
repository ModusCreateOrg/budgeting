import formatPercentage from '../formatPercentage';

describe('formatPercentage', () => {

  it('should format a positive number', () => {
    var formatted = formatPercentage(45);
    expect(formatted.text).toEqual('45%');
  });

  it('should indicate the percent is positive', () => {
    var formatted = formatPercentage(45);
    expect(formatted.isNegative).toEqual(false);
  });

  it('should round a non integer', () => {
    var formatted = formatPercentage(33.33);
    expect(formatted.text).toEqual('33%');
  });

  it('should format a negitive number', () => {
    var formatted = formatPercentage(-10);
    expect(formatted.text).toEqual('-10%');
  });

  it('should format a negitive number without a sign', () => {
    var formatted = formatPercentage(-10, false);
    expect(formatted.text).toEqual('10%');
  });

  it('should indicate the percent is negitive', () => {
    var formatted = formatPercentage(-45);
    expect(formatted.isNegative).toEqual(true);
  });

});
