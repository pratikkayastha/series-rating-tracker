import EpisodeRating from './EpisodeRating';

/**
* Class to represent the rating details regarding a series
* This also represents the response returned by the /series endpoint
*/
class SeriesRatingResponse {
	
	title:string;
	year:number;
	genre:string;
	plot:string;
	poster:string;

	overallRating:number;
	totalSeason:number;

	episodeRatings:EpisodeRating[];


	constructor(title:string, year:number, genre:string, plot:string, 
				poster:string, overallRating:number, totalSeason:number, 
				episodeRatings:EpisodeRating[]) {
		this.title = title;
		this.year = year;
		this.genre = genre;
		this.plot = plot;
		this.poster = poster;
		this.overallRating = overallRating;
		this.totalSeason = totalSeason;
		this.episodeRatings = episodeRatings;
	}
}

export default SeriesRatingResponse;