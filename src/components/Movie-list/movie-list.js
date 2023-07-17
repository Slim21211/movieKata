import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Space } from 'antd';

import { MovieCard } from '../Movie-card/movie-card';
import MovieDB from '../../services/movie-db';
import './movie-list.css';

export class MovieList extends Component {
  movieList = new MovieDB();
  state = {
    movies: [],
    isLoaded: false,
    error: false,
    title: 'The way back',
    date: 'March 5, 2020',
    genres: ['Action', 'Drama'],
    discription:
      'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...',
  };

  constructor() {
    super();
    this.newFilm();
  }

  // test = this.movieList.getAllMovie().then((body) => console.log(body));

  newFilm() {
    this.movieList.getAllMovie().then(
      (body) => {
        this.setState({
          isLoaded: true,
          movies: body,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={`Error ${error.message}`} type="error" showIcon />
        </Space>
      );
    } else if (!isLoaded) {
      return <Spin indicator={this.antIcon} className="spinner" />;
    } else {
      console.log(this.state);
      return (
        <>
          {movies.map((item) => (
            <MovieCard
              title={item.title}
              date={item.release_date}
              genres={this.state.genres}
              discription={item.overview}
              key={item.id}
              poster={item.poster_path}
            />
          ))}
        </>
      );
    }
  }
}
