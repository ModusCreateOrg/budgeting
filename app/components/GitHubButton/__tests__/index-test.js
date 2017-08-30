import React from 'react';
import renderer from 'react-test-renderer';
import GitHubButton from '../';

it('renders correctly', () => {
  // Set up a script tag in the document
  document.body.innerHTML = `
    <script></script>`;

  const tree = renderer.create(<GitHubButton type="Fork" />).toJSON();
  expect(tree).toMatchSnapshot();
});
