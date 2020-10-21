import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'date-fns';
// import { Button, MenuItem, Typography } from '@material-ui/core/';
import GordonPeopleSearch from '../../components/Header/components/PeopleSearch';
import './apartment-people-search.css';
const MIN_QUERY_LENGTH = 2;

//  TextBox Input Field
const renderInput = (inputProps) => {
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
            <PersonAddIcon />
          </InputAdornment>
        ),
        ...other,
      }}
    />
  );
};

/*
 * Modified version of the PeopleSearch, sends search result to
 * ApartmentApp backend rather than redirecting to student profile page.
 */
export default class ApartmentPeopleSearch extends GordonPeopleSearch {
  contructor() {
    // super(props);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  // Send the UserName of the selected student to the ApartmentApp backend
  setApplicant(userName) {
    // TODO - Implement sending this username to the API

    // TODO - delete this line once method is fully implemented
    console.log('The following UserName was selected: ' + userName);

    this.reset();
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
        button={true}
        // component={Button}
        action={
          //`/profile/${suggestion.UserName}`}
          suggestionList &&
          suggestionList[suggestionIndex] !== undefined &&
          suggestion.UserName === suggestionList[suggestionIndex].UserName &&
          suggestionIndex !== -1
            ? this.setApplicant(suggestionList[suggestionIndex].UserName)
            : console.log('Nope: ' + suggestion.UserName)
        }
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

    let content;
    if (this.props.Authentication) {
      // Creates the People Search Bar depending on the status of the network found in local storage
      content = (
        // Assign reference to Downshift to `this` for usage elsewhere in the component
        <Downshift
          ref={(downshift) => {
            this.downshift = downshift;
          }}
        >
          {({ getInputProps, getItemProps, isOpen }) => (
            <span className="apartment-people-search">
              {networkStatus === 'online'
                ? renderInput(
                    getInputProps({
                      placeholder: holder,
                      onChange: (event) => this.getSuggestions(event.target.value),
                      onKeyDown: (event) => this.handleKeys(event.key),
                    }),
                  )
                : renderInput(
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
    } else {
      content = (
        <span className="apartment-people-search">
          <TextField
            placeholder="People Search"
            fullWidth
            value={''}
            onChange={(event) => this.unauthenticatedSearch()}
            className={'text-field'}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: 'people-search-root',
                input: 'people-search-input',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddIcon />
                </InputAdornment>
              ),
            }}
          />
          <Dialog
            open={this.state.loginDialog}
            onClose={(clicked) => this.handleClose()}
            aria-labelledby="login-dialog-title"
            aria-describedby="login-dialog-description"
          >
            <DialogTitle id="login-dialog-title">{'Login to use People Search'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="login-dialog-description">
                You are not logged in. Please log in to use People Search.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={(clicked) => this.handleClose()} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      );
    }
    return content;
  }
}
