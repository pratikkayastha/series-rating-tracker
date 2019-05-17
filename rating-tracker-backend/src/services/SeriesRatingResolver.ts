import { SeriesRatingResponse } from '../entity/SeriesRatingResponse';

/**
* Interface for rating resolver.
* Classes implements this interface can be injected into routes.
*/
interface SeriesRatingResolver {
	resolveRating(series: string): Promise<SeriesRatingResponse>;
}

export default SeriesRatingResolver;