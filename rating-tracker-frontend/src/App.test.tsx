import React from 'react';
import {render, cleanup} from 'react-testing-library';
import App from './App';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('App component renders correctly', () => {
  const { queryByTestId } = render(
    <App />
  );

  //Test if component renders
  expect(queryByTestId('app-container')).toBeTruthy();

  
});