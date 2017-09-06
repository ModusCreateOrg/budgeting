import Broadcast from '../Broadcast';

describe('Broadcast', () => {
  it('should construct correctly', () => {
    const testBroadcast = new Broadcast('initialState');
    expect(testBroadcast.currentState).toEqual('initialState');
    expect(testBroadcast.subscriptions).toEqual([]);
  });

  it('should return the right state', () => {
    const testBroadcast = new Broadcast('initialState');
    expect(testBroadcast.getState()).toEqual('initialState');
  });

  it('should allow to set state', () => {
    const testBroadcast = new Broadcast('initialState');
    expect(testBroadcast.getState()).toEqual('initialState');

    testBroadcast.setState('newState');
    expect(testBroadcast.getState()).toEqual('newState');
  });

  it('should allow to add subscribers', () => {
    const testBroadcast = new Broadcast('initialState');
    const listener = jest.fn();
    testBroadcast.subscribe(listener);
    expect(testBroadcast.subscriptions).toEqual([listener]);
  });

  it('should call subscribers on state change', () => {
    const testBroadcast = new Broadcast('initialState');
    const listener = jest.fn();
    testBroadcast.subscribe(listener);

    testBroadcast.setState('newState');
    expect(listener.mock.calls).toEqual([['newState']]);
  });

  it('should allow to unsubscrbe', () => {
    const testBroadcast = new Broadcast('initialState');
    const listener = jest.fn();
    const unsubscribe = testBroadcast.subscribe(listener);

    testBroadcast.setState('newState');
    expect(listener.mock.calls).toEqual([['newState']]);

    unsubscribe();
    testBroadcast.setState('thisWillNotBeBroadcasted');
    expect(listener.mock.calls).toEqual([['newState']]);
  });
});
