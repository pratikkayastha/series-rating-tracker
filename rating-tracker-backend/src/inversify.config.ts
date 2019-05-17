import { Container } from "inversify";
import { TYPES } from "./types";
import SeriesRatingResolver from "./services/SeriesRatingResolver";
import OmdbSeriesRatingResolver from "./services/OmdbSeriesRatingResolver";
 
const seriesRatingContainer = new Container();
seriesRatingContainer.bind<SeriesRatingResolver>(TYPES.SeriesRatingResolver).to(OmdbSeriesRatingResolver);
 
export { seriesRatingContainer };