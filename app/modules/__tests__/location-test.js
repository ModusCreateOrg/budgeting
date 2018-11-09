import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import locationReducer, { actions } from '../location';

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  describe('setLocation', () => {
    it('should create an action to change the location', async () => {
      const store = mockStore({});

      const newLocation = {
        pathname: '/transactions/2',
        search: '',
        hash: 'h212s',
      };

      const expectedActions = [
        {
          type: 'location/SET_LOCATION',
          location: {
            pathname: '/transactions/2',
            search: '',
            hash: 'h212s',
          },
        },
      ];

      await store.dispatch(actions.setLocation(newLocation));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('reducers', () => {
  describe('locationReducer', () => {
    it('should return the initial state', () => {
      expect(locationReducer(undefined, {})).toEqual({
        pathname: '',
        search: '',
        hash: '',
      });
    });

    it('should handle setLocation action', () => {
      expect(
        locationReducer([], {
          type: 'location/SET_LOCATION',
          location: {
            pathname: '/transactions/2',
            search: '',
            hash: 'h212s',
          },
        })
      ).toEqual({
        pathname: '/transactions/2',
        search: '',
        hash: 'h212s',
      });
    });
  });
});
