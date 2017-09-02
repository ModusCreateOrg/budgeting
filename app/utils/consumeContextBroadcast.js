import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';

/**
 * Returns a HOC you can use to enable a component to receive data
 * from a form data broadcaster in context.
 */
const consumeContextBroadcast = broadcastName => WrappedComponent => {
  class ConsumeContextBroadcast extends React.Component {
    static contextTypes = {
      [broadcastName]: PropTypes.object,
    };

    state = {
      broadcastState: {},
    };

    componentWillMount() {
      const broadcast = this.context[broadcastName];

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
