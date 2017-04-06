// Empty placeholder to reserve reducer namespace.
// Otherwise redux may complain when we asyncrhonously
// inject reducers.
const placeholder = (state = {}) => state;

/**
 * Routing to be implemented
 */
export default {
  categories: placeholder,
  transactions: placeholder,
};
