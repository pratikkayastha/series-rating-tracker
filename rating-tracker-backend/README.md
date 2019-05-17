# Series Rating Tracker Backend

Backend REST API that fetches and compiles ratings of all episodes of a given series. Currently uses OMDB API to fetch ratings. 

### Requirements
* Node >= 8
* Typescript 3

### How to

#### Fetch Ratings
Send GET request to the /series endpoint with IMBD id of a series as parameter

    GET http://localhost:8080/series?series=tt0944947
 Here, 'tt0944947' is IMDB ID for Game of Thrones, you can get this ID from IMDB URL for a series.
 
 #### Test
     npm run test
#### Run
    npm run dev