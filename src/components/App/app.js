import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Spin, Alert, Space, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { GenresProvider } from '../../genres-context/genres-context';
import { SearchForm } from '../Search-form/search-form';
import { MovieList } from '../Movie-list/movie-list';
import { Tabs } from '../Tabs/tabs';
import { RatedList } from '../Rated-list/rated-list';
import { Error } from '../Error/error';
import { CheckConnection } from '../Check-connection/check-connection';
import MovieDB from '../../services/movie-db';

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
    ratedMovies: [],
    isLoaded: false,
    error: false,
    genresList: [],
    activeTab: 'search',
    ratedPage: 1,
    totalRatedPage: 1,
    isRatedPageChange: false,
  };

  antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
      isPageChange: true,
    });
  };

  onChangeRatedPage = (page) => {
    this.setState({
      ratedPage: page,
      isRatedPageChange: true,
    });
  };

  async componentDidMount() {
    this.getFilms(this.state.currentPage, this.state.title);
    this.getGenres();
    if (localStorage.getItem('sessionID') !== null) {
      await this.getRatedFilms(localStorage.getItem('sessionID'), this.state.ratedPage);
      this.sessionId = localStorage.getItem('sessionID');
    } else {
      this.sessId = await this.movieDb.getSessionId().catch((error) => {
        return <Error error={error.message} />;
      });
      localStorage.setItem('sessionID', this.sessId);
      this.sessionId = localStorage.getItem('sessionID');
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.currentPage !== this.state.currentPage && this.state.isPageChange) {
      this.setState({
        isPageChange: false,
      });
      this.getFilms(this.state.currentPage, this.state.title);
    }
    if (prevState.ratedPage !== this.state.ratedPage && this.state.isRatedPageChange) {
      this.setState({
        isRatedPageChange: false,
      });
      this.getRatedFilms(this.sessionId, this.state.ratedPage);
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
    await this.movieDb
      .getGenres()
      .then((data) => {
        this.setState({
          genresList: data.genres,
        });
      })
      .catch((error) => {
        return <Error error={error.message} />;
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

  rateFilm = async (id, session_id = this.sessionId, rating) => {
    await this.movieDb.addRating(id, session_id, rating).catch((error) => {
      return <Error error={error.message} />;
    });
    await this.getRatedFilms(session_id, 1);
  };

  getRatedFilms = async (session_id, page) => {
    await this.movieDb
      .getRatedMovies(session_id, page)
      .then((data) => {
        this.setState({ ratedMovies: data.results, totalRatedPage: data.total_pages });
      })
      .catch((error) => {
        return <Error error={error.message} />;
      });
  };

  onChangeTab = (value) => {
    this.setState({
      activeTab: value,
    });
  };

  render() {
    if (this.state.error) {
      return <Error error={this.state.error.message} />;
    } else if (!this.state.isLoaded) {
      return (
        <Spin
          indicator={this.antIcon}
          className="spinner"
          wrapperClassName="search-form-wrapper"
          style={{ width: '100%', margin: 50 }}
        />
      );
    } else if (!this.state.movies.length) {
      return (
        <Space direction="vertical" style={{ width: '100%', marginBottom: 20 }}>
          <Alert message={'Not found. Change search request'} type="error" showIcon />
        </Space>
      );
    } else {
      return (
        <GenresProvider value={this.state.genresList}>
          <div className="main">
            <CheckConnection />
            <div className="tabs-wrapper">
              <Tabs onChangeTab={(value) => this.onChangeTab(value)} activeTab={this.state.activeTab} />
            </div>
            <div className={this.state.activeTab === 'search' ? 'search-form-wrapper-active' : 'search-form-wrapper'}>
              <SearchForm onChange={this.onChangeRequest} page={this.state.currentPage} />
            </div>
            <div className={this.state.activeTab === 'search' ? 'movie-list-wrapper-active' : 'movie-list-wrapper'}>
              <MovieList
                movies={this.state.movies}
                findGenres={this.findGenres}
                rateFilm={(id, session_id, rating) => this.rateFilm(id, session_id, rating)}
              />
            </div>
            <Pagination
              className={this.state.activeTab === 'search' ? 'search-pagination-active' : 'search-pagination'}
              current={this.state.currentPage}
              onChange={this.onChangePage}
              total={this.state.totalPage * 10}
              showSizeChanger={false}
            />
            <div className={this.state.activeTab === 'rated' ? 'rated-list-wrapper-active' : 'rated-list-wrapper'}>
              <RatedList
                movies={this.state.ratedMovies}
                findGenres={this.findGenres}
                sessionId={this.sessionId}
                ratedPage={this.state.ratedPage}
                totalRatedPage={this.state.totalRatedPage}
              />
            </div>
            <Pagination
              className={this.state.activeTab === 'rated' ? 'rated-pagination-active' : 'rated-pagination'}
              current={this.state.ratedPage}
              onChange={this.onChangeRatedPage}
              showSizeChanger={false}
              total={this.state.totalRatedPage * 10}
            />
          </div>
        </GenresProvider>
      );
    }
  }
}
