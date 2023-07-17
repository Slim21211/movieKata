import React, { Component } from 'react';

import { MovieCard } from '../Movie-card/movie-card';
import MovieDB from '../../services/movie-db';

export class MovieList extends Component {
  movieList = new MovieDB();
  state = {
    movies: [],
    isLoaded: false,
    error: false,
    title: 'The way back',
    date: 'March 5, 2020',
    genres: ['Action', 'Drama'],
    discription:
      'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  };

  constructor() {
    super();
    this.newFilm();
  }

  // test = this.movieList.getAllMovie().then((body) => console.log(body));

  newFilm() {
    this.movieList.getAllMovie().then(
      (body) => {
        this.setState({
          isLoaded: true,
          movies: body,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return <p> Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <>
          {movies.map((item) => (
            <MovieCard
              title={item.title}
              date={item.release_date}
              genres={this.state.genres}
              discription={item.overview}
              key={item.id}
            />
          ))}
        </>
      );
    }
  }
}
