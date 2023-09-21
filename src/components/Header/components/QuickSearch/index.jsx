import {
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce, useNetworkStatus, useWindowSize } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quickSearchService from 'services/quickSearch';
import styles from './QuickSearch.module.css';

const MIN_QUERY_LENGTH = 2;
const BREAKPOINT_WIDTH = 450;
const NO_SEARCH_RESULTS = [0, []];

const highlightParse = (text) => text.replace(/ |\./, '|');

// Highlight first occurrence of 'highlight' in 'text'
function getHighlightedText(text, highlight) {
  // Split text on highlight term, include term itself into parts, ignore case
  const highlights = highlightParse(highlight);
  const parts = text.split(new RegExp(`(${highlights})`, 'gi'));
  let hasMatched = false;
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

const GordonQuickSearch = ({ customPlaceholderText, disableLink, onSearchSubmit }) => {
  // Search time is never used via variable name, but it is used via index
  // to ensure that earlier searches which took longer to run don't overwrite later searches
  // eslint-disable-next-line no-unused-vars
  const [[searchTime, suggestions], setSearchResults] = useState(NO_SEARCH_RESULTS);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useDebounce('', 200);
  const [highlightQuery, setHighlightQuery] = useState(String);
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const isOnline = useNetworkStatus();
  const placeholder = !isOnline
    ? 'Offline'
    : customPlaceholderText ?? (width < BREAKPOINT_WIDTH ? 'People' : 'People Search');

  async function updateQuery(query) {
    query = query.replace(/[^a-zA-Z0-9'\-.\s]/gm, '');

    // Trim beginning or trailing spaces or periods from query text
    const highlightQuery = query.replace(/^[\s.]+|[\s.]+$/gm, '');
    setQuery(query);
    setHighlightQuery(highlightQuery);
  }

  useEffect(() => {
    // Only load suggestions if query is of minimum length
    if (query?.length >= MIN_QUERY_LENGTH) {
      setLoading(true);
      quickSearchService.search(query).then((newResults) => {
        // Only update the search results if the new search time is greater than the previous search time
        setSearchResults((prevResults) =>
          newResults[0] > prevResults[0] ? newResults : prevResults,
        );
        setLoading(false);
      });
    } else {
      setSearchResults(NO_SEARCH_RESULTS);
    }
  }, [query]);

  function handleSubmit(_event, person) {
    if (!person) return;
    disableLink ? onSearchSubmit(person.UserName) : navigate(`/profile/${person.UserName}`);
  }

  function renderSuggestion(props, suggestion) {
    // Bail if any required properties are missing
    if (!suggestion.UserName || !suggestion.FirstName || !suggestion.LastName) {
      return null;
    }

    const highlightQuerySplit = highlightQuery.match(/ |\./);

    const linkProps = !disableLink
      ? {
          component: Link,
          to: `/profile/${suggestion.UserName}`,
        }
      : { onClick: () => onSearchSubmit(suggestion.UserName) };

    return (
      <>
        <MenuItem {...props} {...linkProps} key={suggestion.UserName} className={styles.suggestion}>
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
                suggestion.FirstName +
                  // If having nickname that is unique, display that nickname
                  (suggestion.Nickname &&
                  suggestion.Nickname !== suggestion.FirstName &&
                  suggestion.Nickname !== suggestion.UserName.split(/ |\./)[0]
                    ? ' (' + suggestion.Nickname + ') '
                    : ' ') +
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

  return (
    <Autocomplete
      loading={loading}
      loadingText="Loading..."
      noOptionsText="No results"
      options={suggestions}
      isOptionEqualToValue={(option, value) => option.UserName === value.UserName}
      renderInput={({ InputProps, ...params }) => (
        <TextField
          type="search"
          placeholder={placeholder}
          className={styles.root}
          {...params}
          InputProps={{
            ...InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={styles.searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      )}
      onInputChange={(_event, value) => updateQuery(value)}
      onChange={handleSubmit}
      renderOption={renderSuggestion}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.UserName)}
      filterOptions={(o) => o}
      autoComplete
      autoHighlight
      blurOnSelect
      forcePopupIcon={false}
    />
  );
};

GordonQuickSearch.propTypes = {
  customPlaceholderText: PropTypes.string,
  disableLink: PropTypes.any,
  onSearchSubmit: PropTypes.func,
};

export default GordonQuickSearch;
