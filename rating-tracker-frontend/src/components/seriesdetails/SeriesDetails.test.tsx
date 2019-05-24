import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';
import SeriesDetails from './SeriesDetails';
import SeriesRatingResponse from '../../entities/SeriesRatingResponse';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('SeriesDetails renders correctly', () => {
	const series:SeriesRatingResponse = new SeriesRatingResponse(
			'Title', 2000, 'genre', 'plot', 
			'https://www.google.com', 9.5, 6, []
		);


	const { queryByText } = render(
		<SeriesDetails series={series} />
	);

	expect(queryByText('Title')).toBeTruthy();
	expect(queryByText('genre')).toBeTruthy();
	expect(queryByText('plot')).toBeTruthy();
});