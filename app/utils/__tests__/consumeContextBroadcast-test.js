import * as React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import Broadcast from '../Broadcast';
import consumeContextBroadcast from '../consumeContextBroadcast';

beforeAll(() => {
  // A console.error is expected here, saying that ErrorBoundary will handle an error.
  // We mock this to see a clean output in the test runs.
  console.error = jest.fn();
});

describe('consumeContextBroadcast', () => {
  it('should return a HOC that raises an error if no broadcast exists in context', () => {
    const hoc = consumeContextBroadcast('testBroadcast');
    const WrappedComponent = () => <div>test</div>;
    const GeneratedComponent = hoc(WrappedComponent);

    class ErrorBoundary extends React.Component {
      // eslint-disable-next-line class-methods-use-this
      componentDidCatch(error) {
        expect(error.message).toEqual(
          'consumeContextBroadcast must be rendered in the context of a broadcast with the right name'
        );
      }

      render() {
        return this.props.children;
      }
    }

    renderer.create(
      <ErrorBoundary>
        <GeneratedComponent />
      </ErrorBoundary>
    );
  });

  it('should return a HOC that renders correctly if the right broadcast exists in context', () => {
    const hoc = consumeContextBroadcast('testBroadcast');
    const WrappedComponent = () => <div>test</div>;
    const GeneratedComponent = hoc(WrappedComponent);

    // eslint-disable-next-line react/no-multi-comp
    class ContextProvider extends React.Component {
      static childContextTypes = {
        testBroadcast: PropTypes.object,
      };

      getChildContext() {
        return { testBroadcast: new Broadcast('initialState') };
      }

      render() {
        return this.props.children;
      }
    }

    const tree = renderer
      .create(
        <ContextProvider>
          <GeneratedComponent />
        </ContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should return a HOC that sets a Broadcast state in the context`, () => {
    const hoc = consumeContextBroadcast('testBroadcast');
    const broadcast = new Broadcast('initialState');

    // eslint-disable-next-line react/no-multi-comp
    class ContextProvider extends React.Component {
      static childContextTypes = {
        testBroadcast: PropTypes.object,
      };

      getChildContext() {
        return { testBroadcast: broadcast };
      }

      render() {
        return this.props.children;
      }
    }

    const WrappedComponent = ({ testBroadcast }) => <div>{testBroadcast}</div>;

    const GeneratedComponent = hoc(WrappedComponent);

    const tree = renderer
      .create(
        <ContextProvider>
          <GeneratedComponent />
        </ContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // TODO: Add a test to check if the wrapped component is updated when the broadcast updates.
  // This can be done when Enzyme adds support for React 16.
});
