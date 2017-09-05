// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import type { HigherOrderComponent } from 'types';
import Broadcast from './Broadcast';

type ProvidedProps = {
  [broadcastName: string]: mixed,
};

type ConsumeContextBroadcastState = {
  broadcastState: mixed,
};

/**
 * Returns a HOC you can use to enable a component to receive data
 * from a form data broadcaster in context.
 */
const consumeContextBroadcast = (
  broadcastName: string
): HigherOrderComponent<{}, ProvidedProps> => WrappedComponent => {
  class ConsumeContextBroadcast extends React.Component<{}, ConsumeContextBroadcastState> {
    static contextTypes = {
      [broadcastName]: PropTypes.object,
    };

    state = {
      broadcastState: null,
    };

    componentWillMount() {
      const broadcast = this.context[broadcastName];

      if (!(broadcast instanceof Broadcast)) {
        throw new Error('consumeContextBroadcast must be rendered in the context of a broadcast with the right name');
      }

      // set initial state from the broadcast
      const initialState = broadcast.getState();
      this.updateState(initialState);
    }

    componentDidMount() {
      const broadcast = this.context[broadcastName];

      // subscribe to the form data broadcast
      this.unsubscribe = broadcast.subscribe(this.updateState);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    unsubscribe: () => void;

    updateState = broadcastState => {
      this.setState({ broadcastState: broadcastState });
    };

    render() {
      const { broadcastState } = this.state;
      const props = {
        ...this.props,
        [broadcastName]: broadcastState,
      };

      return <WrappedComponent {...props} />;
    }
  }

  ConsumeContextBroadcast.displayName = `ConsumeContextBroadcast(${getDisplayName(WrappedComponent)})`;
  return ConsumeContextBroadcast;
};

export default consumeContextBroadcast;
