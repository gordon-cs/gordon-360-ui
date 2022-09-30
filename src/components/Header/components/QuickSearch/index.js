import { InputAdornment, MenuItem, Paper, TextField, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Downshift from 'downshift';
import { useDebounce, useNetworkStatus, useWindowSize } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import quickSearchService from 'services/quickSearch';
import styles from './PeopleSearch.module.css';

const MIN_QUERY_LENGTH = 2;
const BREAKPOINT_WIDTH = 450;
const NO_SEARCH_RESULTS = [0, []];

const renderInput = ({ autoFocus, value, ref, ...other }) => (
  <TextField
    type="search"
    autoFocus={autoFocus}
    value={value}
    inputRef={ref}
    InputProps={{
      disableUnderline: true,
      classes: {
        root: styles.root,
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

const GordonQuickSearch = ({ customPlaceholderText, disableLink, onSearchSubmit }) => {
  // Search time is never used via variable name, but it is used via index
  // to ensure that earlier searches which took longer to run don't overwrite later searches
  // eslint-disable-next-line no-unused-vars
  const [[searchTime, suggestions], setSearchResults] = useState(NO_SEARCH_RESULTS);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [query, setQuery] = useDebounce('', 200);
  const [highlightQuery, setHighlightQuery] = useState(String);
  const [downshift, setDownshift] = useState();
  const [width] = useWindowSize();
  const isOnline = useNetworkStatus();
  const placeholder = !isOnline
    ? 'Offline'
    : customPlaceholderText ?? width < BREAKPOINT_WIDTH
    ? 'People'
    : 'People Search';

  async function updateQuery(query) {
    query = query.replace(/[^a-zA-Z0-9'\-.\s]/gm, '');

    // Trim beginning or trailing spaces or periods from query text
    var highlightQuery = query.replace(/^[\s.]+|[\s.]+$/gm, '');
    setQuery(query);
    setHighlightQuery(highlightQuery);
  }

  useEffect(() => {
    // Only load suggestions if query is of minimum length
    if (query?.length >= MIN_QUERY_LENGTH) {
      quickSearchService.search(query).then((newResults) =>
        // Only update the search results if the new search time is greater than the previous search time
        setSearchResults((prevResults) =>
          newResults[0] > prevResults[0] ? newResults : prevResults,
        ),
      );
    } else {
      setSearchResults(NO_SEARCH_RESULTS);
    }
  }, [query]);

  function handleClick(theChosenOne) {
    if (theChosenOne && disableLink) {
      onSearchSubmit(theChosenOne);
    }
    reset();
  }

  function handleKeys(key) {
    let sIndex = suggestionIndex;
    let suggestionList = suggestions;
    let theChosenOne;

    if (key === 'Enter') {
      if (suggestionList && suggestionList.length > 0) {
        sIndex === -1
          ? (theChosenOne = suggestionList[0].UserName)
          : (theChosenOne = suggestionList[sIndex].UserName);
        // If prop set to disable link, then trigger the onSearchSubmit callback function
        // Else, redirect the user to the selected profile page
        disableLink
          ? onSearchSubmit(theChosenOne)
          : (window.location.pathname = '/profile/' + theChosenOne);
        reset();
      }
    }
    if (key === 'ArrowDown') {
      sIndex++;
      sIndex = sIndex % suggestionList.length;
      setSuggestionIndex(sIndex);
    }
    if (key === 'ArrowUp') {
      if (sIndex !== -1) sIndex--;
      if (sIndex === -1) sIndex = suggestionList.length - 1;
      setSuggestionIndex(sIndex);
    }
  }

  function reset() {
    // Remove chosen username from the input
    downshift.clearSelection();

    // Remove loaded suggestions
    downshift.clearItems();

    setSuggestionIndex(-1);
  }

  function highlightParse(text) {
    return text.replace(/ |\./, '|');
  }

  // Highlight first occurrence of 'highlight' in 'text'
  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    var highlights = highlightParse(highlight);
    var parts = text.split(new RegExp(`(${highlights})`, 'gi'));
    var hasMatched = false;
    return (
      <span>
        {parts.map((part, key) =>
          !hasMatched && part.match(new RegExp(`(${highlights})`, 'i'))
            ? (hasMatched = true && (
                <span className={styles.matched_text} key={key}>
                  {part}
                </span>
              ))
            : part,
        )}
      </span>
    );
  }

  function renderSuggestion({ suggestion, itemProps }) {
    // Bail if any required properties are missing
    if (!suggestion.UserName || !suggestion.FirstName || !suggestion.LastName) {
      return null;
    }

    const highlightQuerySplit = highlightQuery.match(/ |\./);

    return (
      // The props for component={Link} and to={`/profile/${suggestion.UserName}`}
      // have been moved to the declaration of itemProps in return().
      // This allows these link features to be omitted if disableLink is true
      <>
        <MenuItem
          {...itemProps}
          key={suggestion.UserName}
          onClick={() => handleClick(suggestion.UserName)}
          className={
            suggestionIndex !== -1 &&
            suggestion.UserName === suggestions?.[suggestionIndex]?.UserName
              ? styles.suggestion_selected
              : styles.suggestion
          }
        >
          <Typography variant="body2">
            {/* If the query contains a space or a period, only highlight occurrences of the first
              name part of the query in the first name, and only highlight occurrences of the last
              name part of the query in the last name. Otherwise, highlight occurrences of the
              query in the first and last name. */}
            {highlightQuerySplit?.length > 1 ? (
              <>
                <span key={1}>
                  {getHighlightedText(suggestion.FirstName + ' ', highlightQuerySplit[0])}
                </span>
                <span key={2}>
                  {getHighlightedText(suggestion.LastName, highlightQuerySplit[1])}
                </span>
              </>
            ) : (
              getHighlightedText(
                // Displays first name
                suggestion.FirstName +
                  // If having nickname that is unique, display that nickname
                  (suggestion.Nickname &&
                  suggestion.Nickname !== suggestion.FirstName &&
                  suggestion.Nickname !== suggestion.UserName.split(/ |\./)[0]
                    ? ' (' + suggestion.Nickname + ') '
                    : ' ') +
                  // Displays last name
                  suggestion.LastName +
                  // If having maiden name that is unique, display that maiden name
                  (suggestion.MaidenName &&
                  suggestion.MaidenName !== suggestion.LastName &&
                  suggestion.MaidenName !== suggestion.UserName.split(/ |\./)[1]
                    ? ' (' + suggestion.MaidenName + ')'
                    : ''),
                highlightQuery,
              )
            )}
          </Typography>
          <Typography variant="caption" component="p">
            {/* If the first name matches either part (first or last name) of the query, don't
              highlight occurrences of the query in the first name part of the username.
              If the username contains a period, add it back in.
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
        <Divider className={styles.suggestion_divider} />
      </>
    );
  }

  // Creates the People Search Bar
  return (
    <Downshift
      // Assign reference to Downshift to state property for usage elsewhere in the component
      ref={(downshift) => {
        setDownshift(downshift);
      }}
    >
      {({ getInputProps, getItemProps, isOpen }) => (
        <span className={styles.people_search} key="suggestion-list-span">
          {renderInput(
            getInputProps({
              placeholder: placeholder,
              ...(isOnline
                ? {
                    onChange: (event) => updateQuery(event.target.value),
                    onKeyDown: (event) => handleKeys(event.key),
                  }
                : {
                    style: { color: 'white' },
                    disabled: { isOnline },
                  }),
            }),
          )}
          {isOpen && query.length >= MIN_QUERY_LENGTH && (
            <Paper square className={styles.dropdown}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) =>
                  renderSuggestion({
                    suggestion,
                    itemProps: getItemProps({
                      item: suggestion.UserName,
                      ...(!disableLink
                        ? {
                            component: Link,
                            to: `/profile/${suggestion.UserName}`,
                          }
                        : {}),
                    }),
                  }),
                )
              ) : (
                <MenuItem className={styles.suggestion} style={{ paddingBottom: '5px' }}>
                  <Typography className={styles.no_results} variant="body2">
                    No results
                  </Typography>
                  <Typography className={styles.loading} variant="body2">
                    Loading...
                  </Typography>
                </MenuItem>
              )}
            </Paper>
          )}
        </span>
      )}
    </Downshift>
  );
};

GordonQuickSearch.propTypes = {
  customPlaceholderText: PropTypes.string,
  disableLink: PropTypes.any,
  onSearchSubmit: PropTypes.func,
};

export default GordonQuickSearch;
