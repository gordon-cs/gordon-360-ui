import Downshift from 'downshift';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './people-search.css';
import peopleSearch from '../../../../services/people-search';

const MIN_QUERY_LENGTH = 3;

const renderInput = inputProps => {
  const { autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      className={'text-field'}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: 'people-search-root',
          input: 'people-search-input',
          inputDisabled: 'people-search-disabled',
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        ...other,
      }}
    />
  );
};

export default class GordonPeopleSearch extends Component {
  constructor(props) {
    super(props);

    this.getSuggestions = this.getSuggestions.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      suggestions: [],
    };
  }
  async getSuggestions(query) {
    // Bail if query is missing or is less than minimum query length
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return;
    }

    let suggestions = await peopleSearch.search(query);

    // Sort first by last name, then by first name
    suggestions = sortBy(suggestions, ['LastName', 'FirstName']);

    // Remove any duplicate entries
    suggestions = uniqBy(suggestions, 'UserName');

    this.setState({ suggestions });
  }
  reset() {
    // Remove chosen username from the input
    this.downshift.clearSelection();

    // Remove loaded suggestions
    this.downshift.clearItems();
  }
  renderSuggestion(params) {
    const { suggestion, itemProps } = params;

    // Bail if any required properties are missing
    if (!suggestion.UserName || !suggestion.FirstName || !suggestion.LastName) {
      return null;
    }

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.UserName}
        component={Link}
        to={`/profile/${suggestion.UserName}`}
        onClick={this.reset}
        className="people-search-suggestion"
      >
        <Typography variant="body1">{`${suggestion.FirstName} ${suggestion.LastName}`}</Typography>
        <Typography variant="caption" component="p">
          {suggestion.UserName}
        </Typography>
      </MenuItem>
    );
  }
  render() {
    return (
      <Downshift
        // Assign reference to Downshift to `this` for usage elsewhere in the component
        ref={downshift => {
          this.downshift = downshift;
        }}
        render={({ getInputProps, getItemProps, isOpen }) => (
          <span className="gordon-people-search">
            {renderInput(
              getInputProps({
                placeholder: 'Search',
                onChange: event => this.getSuggestions(event.target.value),
              }),
            )}
            {isOpen && this.state.suggestions.length > 0 ? (
              <Paper square className="people-search-dropdown">
                {this.state.suggestions.map(suggestion =>
                  this.renderSuggestion({
                    suggestion,
                    itemProps: getItemProps({ item: suggestion.UserName }),
                  }),
                )}
              </Paper>
            ) : null}
          </span>
        )}
      />
    );
  }
}
