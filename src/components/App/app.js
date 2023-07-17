import React, { Component } from "react";
import { Header } from "../Header/header";
import { SearchForm } from "../Search-form/search-form";
import { MovieList } from "../Movie-list/movie-list";
import { Footer } from "../Footer/footer";
import "./app.css";

export class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <SearchForm />
        <MovieList />
        <Footer />
      </div>
    );
  }
}
