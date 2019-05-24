import * as React from "react";
import SeriesRatingResponse from '../../entities/SeriesRatingResponse';
import './style.css';

interface ISeriesDetailsProps {
	series?: SeriesRatingResponse
}

// Spinner component
const SeriesDetails:React.SFC<ISeriesDetailsProps> = (props) => {
	const { series } = props;

	if (series==null) {
		return(null);
	}

	return(
		<div className="series-detaill-container">
			<div className="poster-container">
				<img src={series.poster} alt={series.title} />
			</div>
			<div className="details-container">
				<h3 className="series-name">{series.title}</h3>
				<p className="series-detail">{series.year}</p>
				<p className="series-detail">{series.genre}</p>
				<p className="series-detail">{series.plot}</p>
			</div>
			<div className="clear"></div>
		</div>
	);
};

export default SeriesDetails;