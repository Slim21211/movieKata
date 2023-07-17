import React, { Component } from "react";
import "./movie-card.css";

export class MovieCard extends Component {
  render() {
    const { title, date, genres, discription } = this.props;
    return (
      <>
        <div className="movie-card">
          <div className="movie-card__poster">
            <img
              src="https://img.freepik.com/free-photo/side-view-hand-pouring-coffee-cup_23-2149703752.jpg?w=996&t=st=1689513458~exp=1689514058~hmac=63423cfd64e52d838919562d5ce46bec0f76799d7159c2ba44aaa23f79f01001"
              alt="poster"
            ></img>
          </div>
          <div className="movie-card__info">
            <h2 className="movie-card__title">{title}</h2>
            <span className="movie-card__date">{date}</span>
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
