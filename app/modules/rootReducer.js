// @flow
import type { Categories } from 'modules/categories';
import type { Transaction } from 'modules/transactions';
import type { Location } from 'modules/location';
import locationReducer from 'modules/location';

// Empty placeholder to reserve reducer namespace.
// Otherwise redux may complain when we asyncrhonously
// inject reducers.

export type State = {
  +categories?: Categories,
  +transactions?: Transaction[],
  +location: Location,
};

export default {
  location: locationReducer,
};
