// @flow
/**
 * Action Constants
 */
export const SET_LOCATION = 'location/SET_LOCATION';

export type Location = {
  +pathname: string,
  +search: string,
  +hash: string,
};

type Action = {
  type: string,
  location: Location,
};

/**
 * Actions
 */
export const actions = {
  setLocation: (location: Location) => (dispatch: Function) =>
    dispatch({
      type: SET_LOCATION,
      location: location,
    }),
};

/**
 * Reducer
 */
const locationReducer = function(
  state: Location = {
    pathname: '',
    search: '',
    hash: '',
  },
  action: Action
): Location {
  switch (action.type) {
    case SET_LOCATION:
      return { ...action.location };

    default:
      return state;
  }
};

export default locationReducer;
