import React, { Component } from "react";
import { MovieCard } from "../Movie-card/movie-card";
import MovieDB from "../../services/movie-db";

export class MovieList extends Component {
  movieList = new MovieDB();
  state = {
    title: "The way back",
    date: "March 5, 2020",
    genres: ["Action", "Drama"],
    discription:
      "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...",
  };

  constructor() {
    super();
    this.newFilm();
  }

  test = this.movieList
    .getAllMovie()
    .then((body) => console.log(body.results[0]));

  newFilm() {
    this.movieList.getAllMovie().then((body) => {
      this.setState({
        title: body.results[5].title,
        date: body.results[5].release_date,
        discription: body.results[5].overview,
      });
    });
  }

  render() {
    return (
      <MovieCard
        title={this.state.title}
        date={this.state.date}
        genres={this.state.genres}
        discription={this.state.discription}
      />
    );
  }
}
