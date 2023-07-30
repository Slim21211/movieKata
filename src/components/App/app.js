import React, { Component } from 'react';
// import { Header } from '../Header/header';
import { Pagination } from 'antd';
import { debounce } from 'lodash';

import { GenresProvider } from '../genres-context/genres-context';
import { SearchForm } from '../Search-form/search-form';
import { MovieList } from '../Movie-list/movie-list';
import { Tabs } from '../Tabs/tabs';
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
    genresList: [],
  };

  // test = this.movieDb.getApiFilms(this.state.currentPage, this.state.title).then((data) => console.log(data));
  // testGenres = this.movieDb.getGenres().then((data) => console.log(data.genres));
  // testID = this.movieDb.getSessionId().then((data) => console.log(data));
  // testToken = this.movieDb.getSessionToken().then((data) => console.log(data));
  // testCreate = this.movieDb.createSession().then((data) => console.log(data));

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
      isPageChange: true,
    });
  };

  async componentDidMount() {
    this.getFilms(this.state.currentPage, this.state.title);
    this.getGenres();

    this.sessionId = await this.movieDb.getSessionId();
    localStorage.setItem('sessionID', this.sessionId);
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

  async getGenres() {
    await this.movieDb.getGenres().then((data) => {
      this.setState({
        genresList: data.genres,
      });
    });
  }

  onChangeRequest = (page, value) => {
    let newTitle = value ? value : 'a';
    this.setState({
      title: newTitle,
    });
    this.getFilms(page, newTitle);
  };

  findGenres(arr1, arr2) {
    const finalGenres = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i].id === arr2[j]) {
          finalGenres.push(arr1[i].name);
        }
      }
    }
    return finalGenres;
  }

  render() {
    return (
      <GenresProvider value={this.state.genresList}>
        <div className="main">
          <div className="tabs-wrapper">
            <Tabs />
          </div>
          <div className="search-form-wrapper">
            <SearchForm onChange={this.onChangeRequest} page={this.state.currentPage} />
          </div>
          <div className="movie-list-wrapper">
            <MovieList
              page={this.state.currentPage}
              movies={this.state.movies}
              isLoaded={this.state.isLoaded}
              error={this.state.error}
              title={this.state.title}
              findGenres={this.findGenres}
              sessionId={this.sessionId}
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
      </GenresProvider>
    );
  }
}
