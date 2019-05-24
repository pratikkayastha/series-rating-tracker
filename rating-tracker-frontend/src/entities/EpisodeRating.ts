/**
* Class to represent rating for an episode
*/
class EpisodeRating {
	
	name:string;
	score:number;
	season:number;
	episode:number;
	episodeIdentifier:number;

	constructor(name:string, score:number, season:number, episode:number) {
		this.name = name;
		this.score = score;
		this.season = season;
		this.episode = episode;
		this.episodeIdentifier = (season * 100) + episode;
	}
}

export default EpisodeRating;