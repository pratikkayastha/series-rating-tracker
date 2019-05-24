import SeriesRatingResponse from '../entities/SeriesRatingResponse';

const API_ENDPOINT:string = 'http://localhost:8080/series';

export interface IHttpResponse<ISeriesRatingResponse> extends Response {
  seriesRating?: ISeriesRatingResponse;
}

export const resolveRatings = (imdbId:string):Promise<IHttpResponse<SeriesRatingResponse>> => {
	return new Promise((resolve, reject) => {
		let response: IHttpResponse<SeriesRatingResponse>;

		fetch(`${API_ENDPOINT}?series=${imdbId}`)
		.then(res => {
			response = res;
			return res.json();
		})
		.then(body => {
			if (response.ok) {
				response.seriesRating = body;
				resolve(response);
			} else {
				reject(response);
			}
		})
		.catch(err => {
			reject(err);
		});
	});
}
