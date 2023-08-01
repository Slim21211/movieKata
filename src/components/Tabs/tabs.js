import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

export class Tabs extends Component {
  render() {
    const { onChangeTab, activeTab } = this.props;
    return (
      <>
        <button
          className={activeTab === 'search' ? 'active-search-tab' : 'search-tab'}
          onClick={() => onChangeTab('search')}
        >
          Search
        </button>
        <button
          className={activeTab === 'rated' ? 'active-rated-tab' : 'rated-tab'}
          onClick={() => onChangeTab('rated')}
        >
          Rated
        </button>
      </>
    );
  }
}

Tabs.defaultProps = {
  onChangeTab: () => {},
  activeTab: 'search',
};

Tabs.propTypes = {
  onChangeTab: PropTypes.func,
  activeTab: PropTypes.string,
};
