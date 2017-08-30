// Polyfill for rAF.
//
// This removes the React 16 warning "React depends on requestAnimationFrame"
// when using Enzyme with React 16.
// TODO: Remove this when Enzyme adds support for React 16 (v3)
window.requestAnimationFrame = function(cb) {
  return setTimeout(cb, 0);
};
