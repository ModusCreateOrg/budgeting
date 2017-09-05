// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import Broadcast from 'utils/Broadcast';
import type { HigherOrderComponent } from 'types';

type ProvidedProps = {
  setBroadcastState: (newState: mixed) => void,
};

/**
 * Returns a HOC you can use to send a Broadcast object through context.
 * It passes a `setBroadcastState` prop to the wrapped component to update
 * the Broadcast state.
 */
const provideContextBroadcast = (
  broadcastName: string
): HigherOrderComponent<{}, ProvidedProps> => WrappedComponent => {
  class ContextBroadcastProvider extends React.Component<{}> {
    static childContextTypes = {
      [broadcastName]: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);

      // Initialize form data broadcast
      this.broadcast = new Broadcast();
    }

    getChildContext() {
      return { [broadcastName]: this.broadcast };
    }

    broadcast: Broadcast;

    render() {
      return <WrappedComponent setBroadcastState={this.broadcast.setState} {...this.props} />;
    }
  }

  ContextBroadcastProvider.displayName = `ContextBroadcastProvider(${getDisplayName(WrappedComponent)})`;
  return ContextBroadcastProvider;
};

export default provideContextBroadcast;
