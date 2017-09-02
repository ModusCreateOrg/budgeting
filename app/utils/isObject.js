// @flow

/**
 * Test if reference is an object
 */
export default function isObject(obj: any): boolean {
  return obj !== null && obj !== undefined && Object.prototype.toString.call(obj) === '[object Object]';
}
