import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';
import SearchForm from './SearchForm';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('SearchForm renders correctly', () => {
	const resolveRatings = jest.fn();
	const { queryByTestId } = render(
		<SearchForm resolveRatings={resolveRatings} />
	);

	expect(queryByTestId('search-form')).toBeTruthy();
	expect(queryByTestId('imdbId')).toBeTruthy();
	expect(queryByTestId('submit')).toBeTruthy();
});