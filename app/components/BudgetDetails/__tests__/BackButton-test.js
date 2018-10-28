import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import BackButton from '../BackButton';

// mock nested components
jest.mock('react-router-dom');

describe('Testing BackButton...', () => {
  it('BackButton renders correctly', () => {
    const backButton = renderer.create(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    expect(backButton.toJSON()).toMatchSnapshot();
  });
});
