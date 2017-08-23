// @flow
import type { Categories } from 'modules/categories';
import type { Transaction } from 'modules/transactions';

// Empty placeholder to reserve reducer namespace.
// Otherwise redux may complain when we asyncrhonously
// inject reducers.

export type State = {
  +categories?: Categories,
  +transactions?: Transaction[],
};

/**
 * Routing to be implemented
 */
export default {
  nothing: () => ({}),
};
