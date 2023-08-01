import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search-form.css';

export class SearchForm extends Component {
  state = {
    value: '',
  };

  render() {
    const { page, onChange } = this.props;
    return (
      <div>
        <form>
          <input
            className="search-form"
            type="text"
            value={this.state.value}
            placeholder="Type to search"
            required
            onChange={async (event) => {
              await this.setState({
                value: event.target.value,
              });
              await onChange(page, this.state.value);
            }}
          />
        </form>
      </div>
    );
  }
}

SearchForm.defaultProps = {
  onChange: () => {},
  page: 1,
};

SearchForm.propTypes = {
  onChange: PropTypes.func,
  page: PropTypes.number,
};
