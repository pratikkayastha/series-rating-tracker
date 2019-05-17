import { expect } from 'chai';
import { SeriesRatingResponse, SeriesRatingResponseBuilder } from '../../entity/SeriesRatingResponse';
import EpisodeRating from '../../entity/EpisodeRating';

describe('Build SeriesRatingResponse using builder', () => {
	it('Must build SeriesRatingResponse', () => {
		let seriesRatingBuilder:SeriesRatingResponseBuilder = new SeriesRatingResponseBuilder();

		seriesRatingBuilder
			.setTitle('Veep')
			.setYear(2011)
			.setGenre('Political Comedy')
			.setPlot("Vice president's day to day")
			.setPoster("https://www.google.com")
			.setOverallRating(9.4)
			.setTotalSeason(6)
			.appendEpisodeRatings(
				[
					new EpisodeRating('Atlanta', 8.7, 1, 1),
					new EpisodeRating('Georgia', 8.1, 1, 2)
				]
			);

		const seriesRating:SeriesRatingResponse = seriesRatingBuilder.build();

		expect(seriesRating.title).to.equal('Veep');
		expect(seriesRating.year).to.equal(2011);
		expect(seriesRating.genre).to.equal('Political Comedy');
		expect(seriesRating.plot).to.equal("Vice president's day to day");
		expect(seriesRating.poster).to.equal("https://www.google.com");
		expect(seriesRating.overallRating).to.equal(9.4);
		expect(seriesRating.totalSeason).to.equal(6);
		expect(seriesRating.episodeRatings.length).to.equal(2);
	});
});