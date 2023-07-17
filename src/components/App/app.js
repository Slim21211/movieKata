import React, { Component } from 'react';

// import { Header } from '../Header/header';
// import { SearchForm } from '../Search-form/search-form';
import { MovieList } from '../Movie-list/movie-list';
// import { Footer } from '../Footer/footer';
import { CheckConnection } from '../../services/check-connection';
import './app.css';

export class App extends Component {
  render() {
    return (
      <CheckConnection>
        <div className="main">
          <MovieList />
        </div>
      </CheckConnection>
    );
  }
}
