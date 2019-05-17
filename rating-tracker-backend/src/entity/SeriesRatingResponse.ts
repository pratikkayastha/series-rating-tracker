import EpisodeRating from './EpisodeRating';

/**
* Class to represent the rating details regarding a series
* This also represents the response returned by the /series endpoint
*/
export class SeriesRatingResponse {
	
	title:string;
	year:number;
	genre:string;
	plot:string;
	poster:string;

	overallRating:number;
	totalSeason:number;

	episodeRatings:EpisodeRating[];

}

/**
* Builder class for SeriesRatingResponse
*/
export class SeriesRatingResponseBuilder {

	private seriesRatingResponse:SeriesRatingResponse;

	constructor() {
		this.seriesRatingResponse = new SeriesRatingResponse();
		this.seriesRatingResponse.episodeRatings = [];
	}

	setTitle(title:string):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.title = title;
		return this;
	}

	setYear(year:number):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.year = year;
		return this;
	}

	setGenre(genre:string):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.genre = genre;
		return this;
	}

	setPlot(plot:string):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.plot = plot;
		return this;
	}

	setPoster(poster:string):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.poster = poster;
		return this;
	}

	setOverallRating(overallRating:number):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.overallRating = overallRating;
		return this;
	}

	setTotalSeason(totalSeason:number):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.totalSeason = totalSeason;
		return this;
	}

	appendEpisodeRatings(episodeRatings:EpisodeRating[]):SeriesRatingResponseBuilder {
		this.seriesRatingResponse.episodeRatings.push(...episodeRatings);
		return this;
	}

	build():SeriesRatingResponse {
		// Sorting episode ratings based on season & episode
		// Older season and episodes are placed first
		this.seriesRatingResponse.episodeRatings.sort((ls:EpisodeRating, rs:EpisodeRating):number => {
			if (ls.episodeIdentifier < rs.episodeIdentifier) {
				return -1;
			}
			if (ls.episodeIdentifier > rs.episodeIdentifier) {
				return 1;
			}

			return 0;
		});

		return this.seriesRatingResponse;
	}
}