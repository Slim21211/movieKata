import React, { Component } from 'react';
import './search-form.css';

export class SearchForm extends Component {
  state = {
    value: '',
  };
  render() {
    return (
      <div>
        <input className="search-form" type="text" placeholder="Type to search" required />
      </div>
    );
  }
}
