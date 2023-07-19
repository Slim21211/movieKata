import React, { Component } from 'react';
// import { Header } from '../Header/header';
import { Pagination } from 'antd';

import { SearchForm } from '../Search-form/search-form';
import { MovieList } from '../Movie-list/movie-list';
// import { Footer } from '../Footer/footer';
import './app.css';

export class App extends Component {
  state = {
    currentPage: 2,
  };

  onChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    return (
      <div className="main">
        <div className="search-form-wrapper">
          <SearchForm />
        </div>
        <div className="movie-list-wrapper">
          <MovieList page={this.state.currentPage} />
        </div>
        <Pagination className="pagination" current={this.state.currentPage} onChange={this.onChange} total={5000} />
      </div>
    );
  }
}
