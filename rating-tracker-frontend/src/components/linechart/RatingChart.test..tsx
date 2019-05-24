import React from 'react';
import {render, cleanup} from 'react-testing-library';
import RatingChart from './RatingChart';
import EpisodeRating from '../../entities/EpisodeRating';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Chart renders only when data is passed', () => {
	const episodeRatings: = [new EpisodeRating('test', 3.4, 3, 3)];

	const { queryByTestId } = render(
		<RatingChart episodeRatings={episodeRatings} />
	);

	expect(queryByTestId('chart-container')).toBeTruthy();
});

it('Chart does not render when empty array is passed', () => {
	const { queryByTestId } = render(
		<RatingChart episodeRatings={[]} />
	);

	expect(queryByTestId('chart-container')).toBeNull();
});