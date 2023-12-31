import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './movie-card.css';
import { format } from 'date-fns';
import { Rate } from 'antd';

import img from '../../assets/kisspng-business-click-ecommerce-web-agency-service-plas-no-photo-5b2c4658b95cb8.1567866915296282487593.png';

export class MovieCard extends Component {
  state = {
    rating: 0,
    ratingStyle: '',
  };

  componentDidMount() {
    this.setColor();
  }

  setColor() {
    if (this.props.grade < 3) {
      this.setState({
        ratingStyle: 'awful-mark',
      });
    }
    if (this.props.grade < 5) {
      this.setState({
        ratingStyle: 'bad-mark',
      });
    }
    if (this.props.grade < 7) {
      this.setState({
        ratingStyle: 'good-mark',
      });
    } else {
      this.setState({
        ratingStyle: 'great-mark',
      });
    }
  }

  render() {
    const { title, date, genres, discription, poster, grade, filmId, rateFilm, rating } = this.props;
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
              <div className={`movie-card-rating ${this.state.ratingStyle}`}>{grade.toFixed(1)}</div>
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
                rateFilm(filmId, value);
              }}
            />
          </div>
        </div>
      </>
    );
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
