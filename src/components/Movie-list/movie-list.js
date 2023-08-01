import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GenresConsumer } from '../genres-context/genres-context';
import { MovieCard } from '../Movie-card/movie-card';
import './movie-list.css';

export class MovieList extends Component {
  render() {
    const { movies, findGenres, sessionId, rateFilm } = this.props;
    return (
      <GenresConsumer>
        {(genresList) => {
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
              rateFilm={(id, session_id, rating) => rateFilm(id, session_id, rating)}
            />
          ));
        }}
      </GenresConsumer>
    );
  }
}

MovieList.defaultProps = {
  findGenres: () => {},
  movies: [],
  rateFilm: () => {},
};

MovieList.propTypes = {
  findGenres: PropTypes.func,
  movies: PropTypes.array,
  rateFilm: PropTypes.func,
};
