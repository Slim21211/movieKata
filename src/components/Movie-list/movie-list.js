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
    genres: ['Action', 'Drama'],
  };

  componentDidMount() {
    const { page } = this.props;
    this.newFilm(page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props.page) this.newFilm(this.props.page);
  }

  // test = this.movieList.getAllMovie().then((body) => console.log(body));

  newFilm(page) {
    this.movieList.getAllMovie(page).then(
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
