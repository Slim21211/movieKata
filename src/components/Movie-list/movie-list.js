import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Space } from 'antd';

import { GenresConsumer } from '../genres-context/genres-context';
import { MovieCard } from '../Movie-card/movie-card';
import './movie-list.css';

export class MovieList extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: false,
  };

  antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );

  render() {
    const { error, isLoaded, movies, findGenres, sessionId } = this.props;
    if (error) {
      return (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert message={`Error ${error.message}`} type="error" showIcon />
        </Space>
      );
    } else if (!isLoaded) {
      return <Spin indicator={this.antIcon} className="spinner" />;
    } else if (!movies.length) {
      return (
        <Space direction="vertical" style={{ width: '100%', marginBottom: 20 }}>
          <Alert message={'Not found. Change search request'} type="error" showIcon />
        </Space>
      );
    } else {
      return (
        <GenresConsumer>
          {(genresList) => {
            return movies.map((item) => (
              <MovieCard
                title={item.title}
                date={item.release_date}
                genres={findGenres(genresList, item.genre_ids)}
                discription={item.overview}
                key={item.id}
                poster={item.poster_path}
                filmId={item.id}
                sessionId={sessionId}
              />
            ));
          }}
        </GenresConsumer>
      );
    }
  }
}
