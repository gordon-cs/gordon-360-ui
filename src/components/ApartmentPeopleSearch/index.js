import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React from 'react';
import 'date-fns';
// import { gordonColors } from '../../theme';

// import ProfileList from './../../components/ProfileList';
import GordonPeopleSearch from '../../components/Header/components/PeopleSearch';
import user from './../../services/user';
// import housing from '../../services/housing';
import './apartment-people-search.css';
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
      username: '',
    };
  }

  onUsernameSelected = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
    console.log(this.state.username);
  };

  async loadProfile(searchedUsername) {
    this.setState({ loading: true });
    this.setState({ username: searchedUsername });
    try {
      const profile = await user.getProfileInfo(searchedUsername);
      this.setState({ profile });
      let personType = String(profile.PersonType);
      this.setState({ isStu: personType.includes('stu') });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleSelection(theChosenOne) {
    // Make sure the chosen username was not null
    if (theChosenOne !== null) {
      console.log('DEBUG - Component: The following UserName was selected: ' + theChosenOne);
      // alert(theChosenOne ? `You selected ${theChosenOne}` : 'Selection Cleared');

      // this.loadProfile(theChosenOne);
      this.setState({ username: theChosenOne });
      try {
        const profile = user.getProfileInfo(this.state.username);
        this.setState({ profile });
        let personType = String(profile.PersonType);
        this.setState({ isStu: personType.includes('stu') });
        // Reset the search box
        this.reset();
        // Set the text in the text field to the fullname rather than username
        // this.textFieldRef.value = this.state.profile.fullName;
        // Indicate text field as invalid if the selected person is not a student
        // this.textFieldRef.error = !this.state.isStu;
      } catch (error) {
        // this.textFieldRef.error = true;
        // console.log(error);
      }
    }
  }

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
        // onClick={this.handleClick.bind(this, suggestion)}
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
    if (this.props.AutoFillName) {
      // Creates an non-editable People Search Bar which displays the string given by AutoFillName
      content = (
        <span className="apartment-people-search">
          <TextField
            value={this.props.AutoFillName}
            id="filled-people-search"
            label="Your Name"
            type="search"
            variant="outlined"
            className={'text-field'}
            InputProps={{
              classes: {
                root: 'people-search-root',
                input: 'people-search-input',
              },
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </span>
      );
    } else if (this.props.Authentication) {
      // Creates the People Search Bar depending on the status of the network found in local storage
      content = (
        // Assign reference to Downshift to `this` for usage elsewhere in the component
        <Downshift
          ref={(downshift) => {
            this.downshift = downshift;
          }}
          onChange={(selection) => this.handleSelection(selection)}
        >
          {({ getInputProps, getItemProps, isOpen }) => (
            <span onSubmit={this.onUserNameSelected} className="apartment-people-search">
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
                      // placeholder: this.state.holder,
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
            onChange={() => this.unauthenticatedSearch()}
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
            }}
          />
          <Dialog
            open={this.state.loginDialog}
            onClose={() => this.handleClose()}
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
              <Button variant="contained" onClick={() => this.handleClose()} color="primary">
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
