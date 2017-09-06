import isObject from '../isObject';

describe('isObject', () => {
  it('should detect object from {}', () => {
    expect(isObject({})).toEqual(true);
  });

  it('should detect object from Object.create', () => {
    expect(isObject(Object.create({}))).toEqual(true);
  });

  it('should not detect object from null', () => {
    expect(isObject(null)).toEqual(false);
  });

  it('should not detect object from NaN', () => {
    expect(isObject(NaN)).toEqual(false);
  });

  it('should not detect object from function', () => {
    expect(isObject(() => {})).toEqual(false);
  });

  it('should not detect object from function returning an object', () => {
    expect(isObject(() => ({}))).toEqual(false);
  });

  it('should not detect object from a string', () => {
    expect(isObject('foo')).toEqual(false);
  });

  it('should not detect object from a number', () => {
    expect(isObject(200)).toEqual(false);
  });

  it('should not detect object from a boolean', () => {
    expect(isObject(true)).toEqual(false);
  });

  it('should not detect object from an array', () => {
    expect(isObject([])).toEqual(false);
  });
});
