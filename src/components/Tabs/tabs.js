import React, { Component } from 'react';
import './tabs.css';

export class Tabs extends Component {
  render() {
    return (
      <>
        <button className="search-tab">Search</button>
        <button className="rated-tab">Rated</button>
      </>
    );
  }
}
