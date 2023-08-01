import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './movie-card.css';
import { format } from 'date-fns';
import { Rate } from 'antd';

import MovieDB from '../../services/movie-db';

import img from './kisspng-business-click-ecommerce-web-agency-service-plas-no-photo-5b2c4658b95cb8.1567866915296282487593.png';

export class MovieCard extends Component {
  movieDb = new MovieDB();

  state = {
    rating: 0,
  };

  setColor() {
    if (this.props.grade < 3) {
      return '#E90000';
    }
    if (this.props.grade < 5) {
      return '#E97E00';
    }
    if (this.props.grade < 7) {
      return '#E9D100';
    } else {
      return '#66E900';
    }
  }

  render() {
    const { title, date, genres, discription, poster, grade, filmId, sessionId, rateFilm, rating } = this.props;
    try {
      return (
        <>
          <div className="movie-card">
            <div className="movie-card__poster">
              {poster ? (
                <img src={`https://image.tmdb.org/t/p/w185/${poster}`} alt="poster" />
              ) : (
                <img src={img} alt="poster" />
              )}
            </div>
            <div className="movie-card__info">
              <div className="movie-card-title-wrapper">
                <h2 className="movie-card__title">{title}</h2>
                <div className="movie-card-rating" style={{ border: `2px solid ${this.setColor()}` }}>
                  {grade.toFixed(1)}
                </div>
              </div>

              <span className="movie-card__date">
                {date ? format(new Date(date), 'MMMM dd, yyyy') : <p>No release date</p>}
              </span>
              <div className="movie-card__genre genre">
                {genres.map((item) => {
                  return (
                    <span className="genre__item" key={item}>
                      {item}
                    </span>
                  );
                })}
              </div>
              <p className="movie-card__discription">{discription}</p>
              <Rate
                className="rate"
                allowHalf
                defaultValue={0}
                value={!rating ? this.state.rating : rating}
                count={10}
                onChange={(value) => {
                  this.setState({ rating: value });
                  rateFilm(filmId, sessionId, value);
                }}
              />
            </div>
          </div>
        </>
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}

MovieCard.defaultProps = {
  title: '',
  date: '',
  genres: [],
  discription: '',
  poster: '',
  grade: 0,
  filmId: 0,
  rateFilm: () => {},
  rating: 0,
};

MovieCard.propTypes = {
  findGenres: PropTypes.func,
  movies: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.array,
  discription: PropTypes.string,
  poster: PropTypes.string,
  grade: PropTypes.number,
  filmId: PropTypes.number,
  rateFilm: PropTypes.func,
  rating: PropTypes.number,
};
