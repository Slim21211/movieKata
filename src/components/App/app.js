import React, { Component } from 'react';
// import { Header } from '../Header/header';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

import { SearchForm } from '../Search-form/search-form';
import { MovieList } from '../Movie-list/movie-list';
import MovieDB from '../../services/movie-db';

// import { Footer } from '../Footer/footer';
import './app.css';

export class App extends Component {
  movieDb = new MovieDB();

  state = {
    currentPage: 1,
    totalPage: 1,
    isPageChange: false,
    isCountChange: false,
    title: 'a',
    movies: [],
    isLoaded: false,
    error: false,
    genres: ['Action', 'Drama'],
  };

  // test = this.movieDb.getApiFilms(this.state.currentPage, this.state.title).then((data) => console.log(data));

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
      isPageChange: true,
    });
  };

  componentDidMount() {
    this.getFilms(this.state.currentPage, this.state.title);
  }

  componentDidUpdate(prevState) {
    if (prevState.currentPage !== this.state.currentPage && this.state.isPageChange) {
      this.setState({
        isPageChange: false,
      });
      this.getFilms(this.state.currentPage, this.state.title);
    }
  }

  getFilms = debounce((page, title) => {
    this.movieDb
      .getApiFilms(page, title)
      .then((data) => {
        this.setState({
          isLoaded: true,
          movies: data.results,
          totalPage: data.total_pages,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }, 350);

  onChange = (page, value) => {
    this.getFilms(page, value);
  };

  render() {
    return (
      <div className="main">
        <div className="search-form-wrapper">
          <SearchForm onChange={this.onChange} page={this.state.currentPage} />
        </div>
        <div className="movie-list-wrapper">
          <MovieList
            page={this.state.currentPage}
            movies={this.state.movies}
            isLoaded={this.state.isLoaded}
            error={this.state.error}
            genres={this.state.genres}
            title={this.state.title}
          />
        </div>
        <Pagination
          className="pagination"
          current={this.state.currentPage}
          onChange={this.onChangePage}
          total={this.state.totalPage * 10}
          showSizeChanger={false}
        />
      </div>
    );
  }
}
