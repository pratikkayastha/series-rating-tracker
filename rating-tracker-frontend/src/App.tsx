import React from 'react';
import './App.css';
import SearchForm from './components/searchform/SearchForm';
import LoadingSpinner from './components/loadingspinner/LoadingSpinner';
import { resolveRatings, IHttpResponse } from './services/SeriesRatingService';
import SeriesRatingResponse from './entities/SeriesRatingResponse';
import RatingChart from './components/linechart/RatingChart';
import EpisodeRating from './entities/EpisodeRating';
import SeriesDetails from './components/seriesdetails/SeriesDetails';

interface IAppProps {
  isLoading:boolean,
  hasError:boolean,
  seriesRatings: SeriesRatingResponse
  episodeRatings: EpisodeRating[]
}

class App extends React.Component<IAppProps> {

  state = {
    isLoading: false,
    hasError: false,
    seriesRatings: null,
    episodeRatings: []
  }

  resolveRatings = async (imdbId:string) => {
    this.setState({
      isLoading: true,
      seriesRatings: null,
      episodeRatings: []
    });

    let response: IHttpResponse<SeriesRatingResponse>;
    try {
      response = await resolveRatings(imdbId);
    
      const { seriesRating } = response;
      if (seriesRating!=null) {
        this.setState({
          isLoading: false,
          hasError: false,
          seriesRatings: seriesRating,
          episodeRatings: seriesRating.episodeRatings
        });
      }      
    } catch (response) {
      this.setState({
        isLoading: false,
        hasError: true,
        seriesRatings: null
      })
    }    
  }

 
  render() {
    return(
      <div className="app-container" data-testid='app-container'>
        <h1 className="main-header">Series Rating Resolver</h1>
     
        <SearchForm resolveRatings={this.resolveRatings} />

        <p>You can get the IMDB ID from the URL of the series listing. e.g. tt0944947 for Games of Thrones</p>

      
        <LoadingSpinner isVisible={this.state.isLoading} />

        <SeriesDetails series={this.state.seriesRatings} />

        <RatingChart episodeRatings={this.state.episodeRatings} />

      </div>
    )
  }
}

export default App;
