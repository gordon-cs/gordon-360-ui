import Downshift from 'downshift';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
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
      InputProps={{
        classes: {
          root: 'people-search-input',
          inkbar: 'people-search-inkbar',
          underline: 'people-search-underline',
          inputDisabled: 'people-search-disabled',
        },
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
        <Typography type="body1">{`${suggestion.FirstName} ${suggestion.LastName}`}</Typography>
        <Typography type="caption" component="p">
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
                placeholder: 'Search for people...',
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
