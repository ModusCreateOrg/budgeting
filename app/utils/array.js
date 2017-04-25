/* eslint-disable import/prefer-default-export */

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * From http://stackoverflow.com/a/12646864/857756
 */
export function shuffle(array) {
  const len = array.length;

  for (let i = len - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
