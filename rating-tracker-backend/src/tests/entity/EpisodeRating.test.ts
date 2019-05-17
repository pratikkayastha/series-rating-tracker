import { expect } from 'chai';
import EpisodeRating from '../../entity/EpisodeRating';


describe('Generate EpisodeRating', () => {
	it('Properties are populated correctly', () => {
		//name:string, score:number, season:number, episode:number
		const episodeRating:EpisodeRating = new EpisodeRating('Atlanta', 8.7, 1, 1);

		expect(episodeRating.name).to.equal('Atlanta');
		expect(episodeRating.score).to.equal(8.7);
		expect(episodeRating.season).to.equal(1);
		expect(episodeRating.episode).to.equal(1);
		expect(episodeRating.episodeIdentifier).to.equal(101);
	});
});