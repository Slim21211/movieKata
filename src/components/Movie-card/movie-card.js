import React, { Component } from 'react';
import './movie-card.css';
import { format } from 'date-fns';

import img from './kisspng-business-click-ecommerce-web-agency-service-plas-no-photo-5b2c4658b95cb8.1567866915296282487593.png';

export class MovieCard extends Component {
  render() {
    const { title, date, genres, discription, poster } = this.props;
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
              <h2 className="movie-card__title">{title}</h2>
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
            </div>
          </div>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  }
}
