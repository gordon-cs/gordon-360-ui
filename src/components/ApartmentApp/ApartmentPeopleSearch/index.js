import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import 'date-fns';
import GordonPeopleSearch from '../../../components/Header/components/PeopleSearch';
import '../apartmentAppComponents.css';
const MIN_QUERY_LENGTH = 2;

/*
 * Modified subclass of the PeopleSearch, sends username of selectec search result to
 * ApartmentApp backend rather than redirecting the user to student profile page.
 */
export default class ApartmentPeopleSearch extends GordonPeopleSearch {
  contructor() {
    // super(props);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.state = {
      isStu: Boolean,
      loading: true,
      profile: {},
    };
  }

  handleSelection = (theChosenOne) => {
    // Make sure the chosen username was not null
    if (theChosenOne && theChosenOne !== null) {
      console.log('DEBUG - Component: The following UserName was selected: ' + theChosenOne);
      // Send the selected username to the parent component
      this.props.onSearchSelect(theChosenOne);
      // Reset the search box
      this.reset();
    }
  };

  handleClick = (suggestion) => {
    this.handleSelection(suggestion.UserName);
  };

  handleKeys = (key) => {
    let suggestionIndex = this.state.suggestionIndex;
    let suggestionList = this.state.suggestions;
    let theChosenOne;

    if (key === 'Enter') {
      if (suggestionList && suggestionList.length > 0) {
        suggestionIndex === -1
          ? (theChosenOne = suggestionList[0].UserName)
          : (theChosenOne = suggestionList[suggestionIndex].UserName);
        this.handleSelection(theChosenOne);
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
    if (key === 'Backspace') {
      this.setState({ suggestions: [] });
    }
  };

  //  TextBox Input Field
  renderInput = (inputProps) => {
    const { autoFocus, value, ref, ...other } = inputProps;

    return (
      <TextField
        autoFocus={autoFocus}
        value={value}
        inputRef={ref}
        id="people-search"
        label="Applicant Name"
        type="search"
        variant="outlined"
        className={'text-field'}
        InputProps={{
          classes: {
            root: 'people-search-root',
            input: 'people-search-input',
          },
          startAdornment: (
            <InputAdornment position="start">
              <PersonAddIcon />
            </InputAdornment>
          ),
          ...other,
        }}
      />
    );
  };

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
        onClick={this.handleClick.bind(this, suggestion)}
        className={
          suggestionList && suggestionList[suggestionIndex] !== undefined
            ? suggestion.UserName === suggestionList[suggestionIndex].UserName &&
              suggestionIndex !== -1
              ? 'people-search-suggestion-selected '
              : 'people-search-suggestion'
            : 'people-search-suggestion'
        }
      >
        <Typography variant="body2">
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
              ].map((e) => <span>{e}</span>)
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

  render() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    let holder = 'People Search';
    if (window.innerWidth < this.breakpointWidth) {
      holder = 'People';
      if (networkStatus === 'offline') holder = 'Offline';
    } else if (networkStatus === 'offline') holder = 'Offline-Unavailable';

    // Creates the People Search Bar depending on the status of the network found in local storage
    return (
      // Assign reference to Downshift to `this` for usage elsewhere in the component
      <Downshift
        ref={(downshift) => {
          this.downshift = downshift;
        }}
        // onChange={(selection) => this.handleSelection(selection)}
      >
        {({ getInputProps, getItemProps, isOpen }) => (
          <span className="apartment-people-search">
            {networkStatus === 'online'
              ? this.renderInput(
                  getInputProps({
                    placeholder: holder,
                    onChange: (event) => this.getSuggestions(event.target.value),
                    onKeyDown: (event) => this.handleKeys(event.key),
                  }),
                )
              : this.renderInput(
                  getInputProps({
                    placeholder: holder,
                    style: { color: 'white' },
                    disabled: { networkStatus },
                  }),
                )}
            {isOpen &&
            this.state.suggestions.length > 0 &&
            this.state.query.length >= MIN_QUERY_LENGTH ? (
              <Paper square className="people-search-dropdown">
                {this.state.suggestions.map((suggestion) =>
                  this.renderSuggestion({
                    suggestion,
                    itemProps: getItemProps({ item: suggestion.UserName }),
                  }),
                )}
              </Paper>
            ) : isOpen &&
              this.state.suggestions.length === 0 &&
              this.state.query.length >= MIN_QUERY_LENGTH ? (
              // Styling copied from how renderSuggestion is done with
              // only bottom padding changed and 'no-results' class used
              <Paper square className="people-search-dropdown">
                {this.renderNoResult()}
              </Paper>
            ) : null}
          </span>
        )}
      </Downshift>
    );
  }
}
