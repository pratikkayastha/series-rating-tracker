import { injectable, inject } from "inversify";
import "reflect-metadata";
import SeriesRatingResolver from './SeriesRatingResolver';
import { TYPES } from "../types";
import * as request from "request-promise-native";
import { SeriesRatingResponse, SeriesRatingResponseBuilder } from '../entity/SeriesRatingResponse';
import EpisodeRating from '../entity/EpisodeRating';

@injectable()
class OmdbSeriesRatingResolver implements SeriesRatingResolver {

	private static apiBaseUrl:String = `http://www.omdbapi.com/`;

	/**
	* Fetches & compiles ratings for each episode in the series
	*/
	public async resolveRating(series: string) {
		console.log(`Resolving series rating for ${series}`);

		let seriesRatingBuilder:SeriesRatingResponseBuilder = new SeriesRatingResponseBuilder();

		// First get Series details & number of episodes
		const seriesDetails = await request.get({uri: this.buildRequestUrl(series) }).json();

		// Populate series details
		seriesRatingBuilder
			.setTitle(seriesDetails.Title)
			.setYear(parseInt(seriesDetails.Year))
			.setGenre(seriesDetails.Genre)
			.setPlot(seriesDetails.Plot)
			.setPoster(seriesDetails.Poster)
			.setOverallRating(parseFloat(seriesDetails.imdbRating))
			.setTotalSeason(parseInt(seriesDetails.totalSeasons));

		let seasonPromises:Promise<EpisodeRating[]>[] = [];

		// Get total seasons and fetch details for individual seasons
		for (let season:number = 1; season<=seriesDetails.totalSeasons; season++) {
			seasonPromises.push(this.fetchSeasonDetails(series, season));
		}

		// Flatten season rating responses
		const allEpisodeRatings = await Promise.all(seasonPromises);
		allEpisodeRatings.forEach((seasonEpisodes) => {
			seriesRatingBuilder.appendEpisodeRatings(seasonEpisodes);
		});	

		return seriesRatingBuilder.build();
	}

	/**
	* Fetch rating details for each season
	*/
	private async fetchSeasonDetails(series:string, season:number): Promise<EpisodeRating[]> {
		console.log(`Fetching details for ${series}, Season ${season}`);

		let episodeRatings:EpisodeRating[] = [];

		// Fetch season details from API
		const seasonDetailResponse = await request.get({uri: `${this.buildRequestUrl(series)}&season=${season}`}).json();
		

		// Build EpisodeRating and collect it into an array
		seasonDetailResponse.Episodes.forEach((episode) => {
			episodeRatings.push(new EpisodeRating(episode.Title, parseFloat(episode.imdbRating), season, parseInt(episode.Episode)));
		});

		return episodeRatings;
	}

	/**
	* Builds request URL for series with API key
	*/
	private buildRequestUrl(series:string): string {
		return `${OmdbSeriesRatingResolver.apiBaseUrl}?apiKey=${process.env.OMDB_API_KEY}&i=${series}`;
	}

}

export default OmdbSeriesRatingResolver;