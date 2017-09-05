import * as React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import Broadcast from '../Broadcast';
import provideContextBroadcast from '../provideContextBroadcast';

describe('provideContextBroadcast', () => {
  it('should return a HOC that renders correctly', () => {
    const hoc = provideContextBroadcast('testBroadcast');
    const WrappedComponent = () => <div>test</div>;
    const GeneratedComponent = hoc(WrappedComponent);

    const tree = renderer.create(<GeneratedComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return a HOC that sets a Broadcast object in the context', () => {
    const hoc = provideContextBroadcast('testBroadcast');

    class WrappedComponent extends React.Component {
      static contextTypes = {
        testBroadcast: PropTypes.object,
      };

      render() {
        const broadcast = this.context.testBroadcast;
        expect(broadcast instanceof Broadcast).toEqual(true);

        return <div>test</div>;
      }
    }

    const GeneratedComponent = hoc(WrappedComponent);
    renderer.create(<GeneratedComponent />).toJSON();
  });

  it('should return a HOC with a prop to update the state of the Broadcast object in the context', () => {
    const hoc = provideContextBroadcast('testBroadcast');

    // eslint-disable-next-line react/no-multi-comp
    class WrappedComponent extends React.Component {
      static contextTypes = {
        testBroadcast: PropTypes.object,
      };

      componentWillMount() {
        const { setBroadcastState } = this.props;

        // update broadcast state
        setBroadcastState('newState');
      }

      render() {
        const broadcast = this.context.testBroadcast;

        // check that the broadcast state was updated
        //
        // NOTE: In real code this should be checked using a subscriber, that handles the case of
        // `shouldComponentUpdate` returning `false` in any place between the context provider and
        // the component that subscribes.
        expect(broadcast.getState()).toEqual('newState');

        return <div>test</div>;
      }
    }

    const GeneratedComponent = hoc(WrappedComponent);
    renderer.create(<GeneratedComponent />).toJSON();
  });
});
