import React, { Component } from 'react';
import './movie-card.css';
import { format } from 'date-fns';

export class MovieCard extends Component {
  render() {
    const { title, date, genres, discription, poster } = this.props;
    return (
      <>
        <div className="movie-card">
          <div className="movie-card__poster">
            {<img src={`https://image.tmdb.org/t/p/w185/${poster}`} alt="poster"></img>}
          </div>
          <div className="movie-card__info">
            <h2 className="movie-card__title">{title}</h2>
            <span className="movie-card__date">{format(new Date(date), 'MMMM dd, yyyy')}</span>
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
  }
}
