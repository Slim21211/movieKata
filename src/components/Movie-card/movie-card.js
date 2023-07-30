import React, { Component } from 'react';
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
    if (this.state.rating < 3) {
      return '#E90000';
    }
    if (this.state.rating < 5) {
      return '#E97E00';
    }
    if (this.state.rating < 7) {
      return '#E9D100';
    } else {
      return '#66E900';
    }
  }

  rateFilm = (id, session_id, rating) => {
    this.movieDb.addRating(id, session_id, rating);
  };

  render() {
    const { title, date, genres, discription, poster, filmId, sessionId } = this.props;
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
                  {this.state.rating}
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
                value={this.state.rating}
                count={10}
                onChange={(value) => {
                  this.setState({ rating: value });
                  this.rateFilm(filmId, sessionId, value);
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
