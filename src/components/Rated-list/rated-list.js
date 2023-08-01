import React, { Component } from 'react';

import { GenresConsumer } from '../genres-context/genres-context';
import { MovieCard } from '../Movie-card/movie-card';
import './rated-list.css';

export class RatedList extends Component {
  render() {
    const { movies, findGenres, sessionId } = this.props;
    return (
      <GenresConsumer>
        {(genresList) => {
          if (!movies) {
            return null;
          } else {
            return movies.map((item) => (
              <MovieCard
                title={item.title}
                date={item.release_date}
                genres={findGenres(genresList, item.genre_ids)}
                discription={item.overview}
                key={item.id}
                poster={item.poster_path}
                grade={item.vote_average}
                filmId={item.id}
                sessionId={sessionId}
                rating={item.rating}
              />
            ));
          }
        }}
      </GenresConsumer>
    );
  }
}
