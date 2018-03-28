import formatValueSign from '../formatValueSign';

describe('formatValueSign', () => {
  it('should show value with positive sign', () => {
    expect(formatValueSign(1, '1')).toEqual({
      text: '+1',
      isNegative: false,
    });
  });

  it('should show value with negative sign', () => {
    expect(formatValueSign(-1, '1')).toEqual({
      text: '-1',
      isNegative: true,
    });
  });

  it('should show value without negative sign', () => {
    expect(formatValueSign(-1, '1', false)).toEqual({
      text: '1',
      isNegative: true,
    });
  });

  it('should show value without positive sign', () => {
    expect(formatValueSign(1, '1', false)).toEqual({
      text: '1',
      isNegative: false,
    });
  });

  it('should show value without plus symbol when positive sign', () => {
    expect(formatValueSign(1, '1', false, false)).toEqual({
      text: '1',
      isNegative: false,
    });
  });
});
