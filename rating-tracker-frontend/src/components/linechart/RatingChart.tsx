import * as React from 'react';
import EpisodeRating from '../../entities/EpisodeRating';
import {Line} from 'react-chartjs-2';
import './style.css';

interface ILineChartProps {
	episodeRatings: EpisodeRating[]
}

const RatingChart:React.SFC<ILineChartProps> = (props) => {
	const { episodeRatings } = props;
	const episodes = new Map(episodeRatings.map(e => [e.episodeIdentifier.toString(), e]));

	if (episodeRatings.length<1 || episodes==null) {
		return (null);
	}

	let ratingData = {
		labels: episodeRatings.map(er => er.episodeIdentifier),
		datasets: [
			{
				fill: true,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.1)',
				borderColor: '#3498db',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: episodeRatings.map(er => er.score )
			}
		]
	};

	const options = {
		
		scales: {
            yAxes: [{
            	scaleLabel: {
			        display: true,
			        labelString: 'IMDB Rating'
			    },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
            	scaleLabel: {
			        display: true,
			        labelString: 'Episode Identifier'
			    },
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem:any, data:any) {
                	const episode = episodes.get(tooltipItem[0].label);
                	if (episode) {
						return episode.name;
                	} else {
                		return "";
                	}
                },
                beforeBody: function(tooltipItem:any, data:any) {
                	const episode = episodes.get(tooltipItem[0].label);
                	if (episode) {
						return `Season ${episode.season}\nEpisode ${episode.episode}`;
                	} else {
                		return "";
                	}
                },
                labelColor: function(tooltipItem:any, chart:any) {
                    return {
                        borderColor: '#3498db',
                        backgroundColor: '#3498db'
                    };
                },
            }
        }
	}

	return(
		<div className="chart-container" data-testid='chart-container'>
 			<Line data={ratingData} options={options} />
		</div>
	);
};


export default RatingChart;