/* eslint-disable import/prefer-default-export */

/**
 * Generate random hex value
 * From https://www.paulirish.com/2009/random-hex-color-code-snippets/
 */
export function getRandomHex() {
  return `#${`${Math.random().toString(16)}000000`.slice(2, 8).toUpperCase()}`;
}
