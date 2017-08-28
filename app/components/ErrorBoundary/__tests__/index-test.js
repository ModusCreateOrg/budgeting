import React from 'react';
import renderer from 'react-test-renderer';
import ErrorBoundary from '../';

const FailingComponent = () => {
  throw new Error('I crashed');
};

const WorkingComponent = () => <div>working</div>;

const FallbackComponent = () => <div>fallback</div>;

beforeAll(() => {
  // A console.error is expected here, saying that ErrorBoundary will handle an error.
  // We mock this to see a clean output in the test runs.
  console.error = jest.fn();
});

it('renders a working component', () => {
  const tree = renderer
    .create(
      <ErrorBoundary fallbackComponent={FallbackComponent}>
        <WorkingComponent />
      </ErrorBoundary>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a fallback component when the children component fails', () => {
  const tree = renderer
    .create(
      <ErrorBoundary fallbackComponent={FallbackComponent}>
        <FailingComponent />
      </ErrorBoundary>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls an error handler when the children component fails', () => {
  const handleError = jest.fn();

  renderer.create(
    <ErrorBoundary fallbackComponent={FallbackComponent} onError={handleError}>
      <FailingComponent />
    </ErrorBoundary>
  );

  expect(handleError).toHaveBeenCalled();
});
