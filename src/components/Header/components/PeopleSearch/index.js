import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './people-search.css';
import peopleSearch from '../../../../services/people-search';
import { useNetworkIsOnline } from '../../../../context/NetworkContext';

const MIN_QUERY_LENGTH = 2;
const BREAKPOINT_WIDTH = 400;

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
          // inputDisabled: 'people-search-disabled', // `inputDisabled` is not a valid classes prop for this Material-UI component. See https://material-ui.com/api/autocomplete/#css
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

const GordonPeopleSearch = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [query, setQuery] = useState('');
  const [highlightQuery, setHighlightQuery] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const downshiftRef = useRef(null);
  const isOnline = useNetworkIsOnline();

  const getSuggestions = async (query) => {
    setQuery(query.replace(/[^a-zA-Z0-9'\-.\s]/gm, ''));
    // Trim beginning or trailing spaces or periods from query text
    query.replace(/^[\s.]+|[\s.]+$/gm, '');
    setHighlightQuery(query.replace(/^[\s.]+|[\s.]+$/gm, ''));

    // Bail if query is missing or is less than minimum query length
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return;
    }

    //so apparently everything breaks if the first letter is capital, which is what happens on mobile
    //sometimes and then you spend four hours trying to figure out why downshift is not working
    //but really its just that its capitalized what the heck
    setQuery((prevQuery) => prevQuery.toLowerCase());

    peopleSearch.search(query).then((s) => setSuggestions(s));
  };

  const handleKeys = (key) => {
    let theChosenOne;

    if (key === 'Enter') {
      if (suggestions && suggestions.length > 0) {
        suggestionIndex === -1
          ? (theChosenOne = suggestions[0].UserName)
          : (theChosenOne = suggestions[suggestionIndex].UserName);
        window.location.pathname = '/profile/' + theChosenOne;
        reset();
      }
    }
    if (key === 'ArrowDown') {
      setSuggestionIndex(suggestionIndex + (1 % suggestions.length));
    }
    if (key === 'ArrowUp') {
      let newIndex;
      if (suggestionIndex !== -1) newIndex = suggestionIndex - 1;
      if (suggestionIndex === -1) newIndex = suggestions.length - 1;
      setSuggestionIndex(newIndex);
    }
    if (key === 'Backspace') {
      setSuggestions([]);
    }
  };

  const reset = () => {
    // Remove chosen username from the input
    downshiftRef.current.clearSelection();

    // Remove loaded suggestions
    downshiftRef.current.clearItems();

    setSuggestionIndex(-1);
  };

  const highlightParse = (text) => {
    return text.replace(/ |\./, '|');
  };

  // Highlight first occurrence of 'highlight' in 'text'
  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    var highlights = highlightParse(highlight);
    var parts = text.split(new RegExp(`(${highlights})`, 'gi'));
    var hasMatched = false;
    return (
      <span>
        {parts.map((part, key) =>
          !hasMatched && part.match(new RegExp(`(${highlights})`, 'i'))
            ? (hasMatched = true && (
                <span className="h" key={key}>
                  {part}
                </span>
              ))
            : part,
        )}
      </span>
    );
  };

  const renderNoResult = () => {
    return (
      <MenuItem className="people-search-suggestion" style={{ paddingBottom: '5px' }}>
        <Typography className="no-results" variant="body2">
          No results
        </Typography>
        <Typography className="loading" variant="body2">
          Loading...
        </Typography>
      </MenuItem>
    );
  };

  const renderSuggestion = (params) => {
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
        onClick={reset}
        className={
          suggestions && suggestions[suggestionIndex] !== undefined
            ? suggestion.UserName === suggestions[suggestionIndex].UserName &&
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
          {highlightQuery.match(/ |\./)
            ? [
                getHighlightedText(suggestion.FirstName + ' ', highlightQuery.split(/ |\./)[0]),
                getHighlightedText(suggestion.LastName, highlightQuery.split(/ |\./)[1]),
              ].map((e, key) => <span key={key}>{e}</span>)
            : getHighlightedText(suggestion.FirstName + ' ' + suggestion.LastName, highlightQuery)}
        </Typography>
        <Typography variant="caption" component="p">
          {/* If the first name matches either part (first or last name) of the query, don't
              highlight occurrences of the query in the first name part of the username.
              If the username contains a period, add it back in.
              If the username contains a period,
              If the last name matches either part (first of last name) of the query, don't
              highlight occurrences of the query in the last name part of the username. */}
          {!suggestion.FirstName.match(new RegExp(`(${highlightParse(highlightQuery)})`, 'i'))
            ? getHighlightedText(suggestion.UserName.split('.')[0], highlightQuery)
            : suggestion.UserName.split('.')[0]}
          {suggestion.UserName.includes('.') && '.'}
          {suggestion.UserName.includes('.') &&
            (!suggestion.LastName.match(new RegExp(`(${highlightParse(highlightQuery)})`, 'i'))
              ? getHighlightedText(suggestion.UserName.split('.')[1], highlightQuery)
              : suggestion.UserName.split('.')[1])}
        </Typography>
      </MenuItem>
    );
  };

  //Makes People Search placeholder switch to People to avoid cutting it off
  //Has to rerender on screen resize in order to switch to the mobile view
  const resize = () => {
    if (breakpointPassed()) {
      setIsMobileView((i) => !i);
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  const breakpointPassed = () => {
    if (isMobileView && window.innerWidth > BREAKPOINT_WIDTH) return true;
    if (!isMobileView && window.innerWidth < BREAKPOINT_WIDTH) return true;
    else return false;
  };

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  const unauthenticatedSearch = () => {
    setShowLoginDialog(true);
  };

  const handleClose = () => {
    setShowLoginDialog(false);
  };

  const placeholderText = () => {
    if (window.innerWidth < BREAKPOINT_WIDTH) {
      // Mobile placeholder
      return isOnline ? 'People' : 'Offline';
    } else {
      return isOnline ? 'People Search' : 'Offline-Unavailable';
    }
  };

  let content;
  if (props.authentication) {
    content = (
      // Assign reference to Downshift to `this` for usage elsewhere in the component
      <Downshift ref={downshiftRef}>
        {({ getInputProps, getItemProps, isOpen }) => (
          <span className="gordon-people-search" key="suggestion-list-span">
            {isOnline
              ? renderInput(
                  getInputProps({
                    placeholder: placeholderText(),
                    onChange: (event) => getSuggestions(event.target.value),
                    onKeyDown: (event) => handleKeys(event.key),
                  }),
                )
              : renderInput(
                  getInputProps({
                    placeholder: placeholderText(),
                    style: { color: 'white' },
                    disabled: { isOnline },
                  }),
                )}
            {isOpen && suggestions.length > 0 && query.length >= MIN_QUERY_LENGTH ? (
              <Paper square className="people-search-dropdown">
                {suggestions.map((suggestion) =>
                  renderSuggestion({
                    suggestion,
                    itemProps: getItemProps({ item: suggestion.UserName }),
                  }),
                )}
              </Paper>
            ) : isOpen && suggestions.length === 0 && query.length >= MIN_QUERY_LENGTH ? (
              // Styling copied from how renderSuggestion is done with
              // only bottom padding changed and 'no-results' class used
              <Paper square className="people-search-dropdown">
                {renderNoResult()}
              </Paper>
            ) : null}
          </span>
        )}
      </Downshift>
    );
  } else {
    content = (
      <span className="gordon-people-search">
        <TextField
          placeholder={placeholderText()}
          value={''}
          onChange={(event) => unauthenticatedSearch()}
          className={'text-field'}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: 'people-search-root',
              input: 'people-search-input',
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Dialog
          open={showLoginDialog}
          onClose={(clicked) => handleClose()}
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
            <Button variant="contained" onClick={(clicked) => handleClose()} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
  return content;
};

export default GordonPeopleSearch;
