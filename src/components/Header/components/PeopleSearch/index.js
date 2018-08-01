import Downshift from 'downshift';
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

//  TextBox Input Field
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
    this.handleKeys = this.handleKeys.bind(this);
    this.state = {
      suggestions: [],
      suggestionIndex: -1,
      query: String,
      highlightQuery: String,
    };
    this.isMobileView = false;
    this.breakpointWidth = 400;
  }

  async getSuggestions(query) {
    query = query.replace(/[^a-zA-Z0-9'\-.\s]/gm, '');

    // Trim beginning or trailing spaces or periods from query text
    var highlightQuery = query.replace(/^[\s.]+|[\s.]+$/gm, '');
    this.setState({ highlightQuery, query });

    // Bail if query is missing or is less than minimum query length
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return;
    }

    //so apparently everything breaks if the first letter is capital, which is what happens on mobile
    //sometimes and then you spend four hours trying to figure out why downshift is not working
    //but really its just that its capitalized what the heck
    query = query.toLowerCase();

    let suggestions = await peopleSearch.search(query);

    this.setState({ suggestions });
  }

  handleKeys = key => {
    let suggestionIndex = this.state.suggestionIndex;
    let suggestionList = this.state.suggestions;
    let theChosenOne;

    if (key === 'Enter') {
      if (suggestionList && suggestionList.length > 0) {
        suggestionIndex === -1
          ? (theChosenOne = suggestionList[0].UserName)
          : (theChosenOne = suggestionList[suggestionIndex].UserName);
        window.location.pathname = '/profile/' + theChosenOne;
        this.reset();
      }
    }
    if (key === 'ArrowDown') {
      suggestionIndex++;
      suggestionIndex = suggestionIndex % suggestionList.length;
      this.setState({ suggestionIndex });
    }
    if (key === 'ArrowUp') {
      if (suggestionIndex !== -1) suggestionIndex--;
      if (suggestionIndex === -1) suggestionIndex = suggestionList.length - 1;
      this.setState({ suggestionIndex });
    }
  };

  reset() {
    // Remove chosen username from the input
    this.downshift.clearSelection();

    // Remove loaded suggestions
    this.downshift.clearItems();

    this.setState({ suggestionIndex: -1 });
  }

  highlightParse(text) {
    return text.replace(/ |\./, '|');
  }

  // Highlight first occurrence of 'highlight' in 'text'
  getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    var highlights = this.highlightParse(highlight);
    var parts = text.split(new RegExp(`(${highlights})`, 'gi'));
    var hasMatched = false;
    return (
      <span>
        {parts.map(
          part =>
            !hasMatched && part.match(new RegExp(`(${highlights})`, 'i'))
              ? (hasMatched = true && <span class="h">{part}</span>)
              : part,
        )}
      </span>
    );
  }

  renderSuggestion(params) {
    const { suggestion, itemProps } = params;
    let suggestionIndex = this.state.suggestionIndex;
    let suggestionList = this.state.suggestions;
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
        className={
          suggestionList && suggestionList[suggestionIndex] !== undefined
            ? suggestion.UserName === suggestionList[suggestionIndex].UserName &&
              suggestionIndex !== -1
              ? 'people-search-suggestion-selected '
              : 'people-search-suggestion'
            : 'people-search-suggestion'
        }
      >
        <Typography variant="body1">
          {/* If the query contains a space or a period, only highlight occurrences of the first
              name part of the query in the first name, and only highlight occurrences of the last
              name part of the query in the last name. Otherwise, highlight occurrences of the
              query in the first and last name. */}
          {this.state.highlightQuery.match(/ |\./)
            ? [
                this.getHighlightedText(
                  suggestion.FirstName + ' ',
                  this.state.highlightQuery.split(/ |\./)[0],
                ),
                this.getHighlightedText(
                  suggestion.LastName,
                  this.state.highlightQuery.split(/ |\./)[1],
                ),
              ].map(e => <span>{e}</span>)
            : this.getHighlightedText(
                suggestion.FirstName + ' ' + suggestion.LastName,
                this.state.highlightQuery,
              )}
        </Typography>
        <Typography variant="caption" component="p">
          {/* If the first name matches either part (first or last name) of the query, don't
              highlight occurrences of the query in the first name part of the username.
              
              If the username contains a period, add it back in.
              
              If the username contains a period,
              If the last name matches either part (first of last name) of the query, don't
              highlight occurrences of the query in the last name part of the username. */}
          {!suggestion.FirstName.match(
            new RegExp(`(${this.highlightParse(this.state.highlightQuery)})`, 'i'),
          )
            ? this.getHighlightedText(suggestion.UserName.split('.')[0], this.state.highlightQuery)
            : suggestion.UserName.split('.')[0]}
          {suggestion.UserName.includes('.') && '.'}
          {suggestion.UserName.includes('.') &&
            (!suggestion.LastName.match(
              new RegExp(`(${this.highlightParse(this.state.highlightQuery)})`, 'i'),
            )
              ? this.getHighlightedText(
                  suggestion.UserName.split('.')[1],
                  this.state.highlightQuery,
                )
              : suggestion.UserName.split('.')[1])}
        </Typography>
      </MenuItem>
    );
  }

  //Makes People Search placeholder switch to People to avoid cutting it off
  //Has to rerender on screen resize in order to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    let placeholder = 'People Search';
    if (window.innerWidth < this.breakpointWidth) {
      placeholder = 'People';
    }
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
                placeholder: placeholder,
                onChange: event => this.getSuggestions(event.target.value),
                onKeyDown: event => {
                  this.handleKeys(event.key);
                },
              }),
            )}
            {isOpen &&
            this.state.suggestions.length > 0 &&
            this.state.query.length >= MIN_QUERY_LENGTH ? (
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
