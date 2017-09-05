// @flow

type Subscription = (currentState: mixed) => void;

/**
 * Broadcast
 *
 * Event emitter which provides a generic way to pass values to children
 * using React's context.
 *
 * We have to use this because we can't send data to children directly in the context.
 * If we do so, and `shouldComponentUpdate` returns false somewhere in the child tree,
 * then it's children won't get the updated context when it changes.
 *
 * To be able to send data, context should not change. Instead, context is used
 * to notify components about state changes.
 */
class Broadcast {
  currentState: mixed;
  subscriptions: Subscription[];

  constructor(initialState: mixed): void {
    this.currentState = initialState;
    this.subscriptions = [];
  }

  getState = (): mixed => this.currentState;

  setState = (newState: mixed): void => {
    this.currentState = newState;

    this.subscriptions.forEach(subscription => subscription(this.currentState));
  };

  subscribe = (subscription: Subscription): (() => void) => {
    this.subscriptions.push(subscription);

    // return `unsubscribe` function
    return () => {
      this.subscriptions = this.subscriptions.filter(item => item !== subscription);
    };
  };
}

export default Broadcast;
