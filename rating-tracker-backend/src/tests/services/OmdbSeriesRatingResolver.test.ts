import { expect } from 'chai';
import * as nock from 'nock';
import OmdbSeriesRatingResolver from '../../services/OmdbSeriesRatingResolver';
import { SeriesRatingResponse } from '../../entity/SeriesRatingResponse';

describe('Test OmdbSeriesRatingResolver Rating Resolver', () => {
	beforeEach(()=> {
		const seriesResponse = require('../resources/seriesResponse');

		nock('http://www.omdbapi.com/')
		  .persist()
	      .get(() => true)
	      .reply(200, seriesResponse);
	});

	it('Must resolve ratings correctly got GOT', async () => {
		const omdbRatingResolver:OmdbSeriesRatingResolver = new OmdbSeriesRatingResolver();
		const seriesRating:SeriesRatingResponse = await omdbRatingResolver.resolveRating('tt0944947');

		expect(seriesRating.title).to.equal('Game of Thrones');
		expect(seriesRating.year).to.equal(2011);
		expect(seriesRating.genre).to.equal('Action, Adventure, Drama, Fantasy, Romance');
		expect(seriesRating.plot).to.equal('Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.');
		expect(seriesRating.poster).to.equal('https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_SX300.jpg');

		expect(9.5).to.equal(seriesRating.overallRating);
		expect(8).to.equal(seriesRating.totalSeason);

		expect(0).to.lessThan(seriesRating.episodeRatings.length);
	});
});