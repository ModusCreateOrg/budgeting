// @flow
import type { State } from 'modules/rootReducer';

export const getPath = (state: State): string[] => ((state.location && state.location.pathname) ? state.location.pathname.split('/') : []); // eslint-disable-line
