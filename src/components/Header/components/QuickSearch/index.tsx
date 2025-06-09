import {
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Autocomplete,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNetworkStatus, useWindowSize } from 'hooks';
import { Dispatch, HTMLAttributes, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quickSearchService from 'services/quickSearch';
import styles from './QuickSearch.module.css';
import { debounce } from 'lodash';
import { SearchResult } from 'services/quickSearch';

const MIN_QUERY_LENGTH = 2;
const BREAKPOINT_WIDTH = 450;

const default_state = {
  loading: false,
  searchTime: 0,
  searchResults: [] as SearchResult[],
  highlightRegex: null,
} as const satisfies State;

type State = {
  loading: boolean;
  searchTime: number;
  searchResults: SearchResult[];
  highlightRegex: RegExp | null;
};

type Action =
  | { type: 'INPUT' }
  | { type: 'LOAD'; payload: Omit<State, 'loading'> }
  | { type: 'RESET' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, searchResults: [], loading: true };
    case 'LOAD': {
      if (action.payload.searchTime > state.searchTime) {
        return { ...action.payload, loading: false };
      } else {
        return state;
      }
    }
    case 'RESET':
      return default_state;
    default:
      throw new Error(`Invalid action in QuickSearch reducer: ${action}`);
  }
};

type SearchFunction = (
  query: string,
) => Promise<[searchTime: number, searchResults: SearchResult[]]>;

/**
 * Search for given query, if query is not updated before debounce timeout (400ms).
 *
 * Once results are fetched, update state with new results
 * and new highlight regex for the query used to fetch these results.
 */
const performSearch = debounce(
  async (
    query: string,
    dispatch: Dispatch<Action>,
    searchFunction: SearchFunction = quickSearchService.search,
  ) => {
    const resultsPromise = searchFunction(query);

    const queryParts = query
      .replace(startingAndEndingSpacesOrPeriodsRegex, '')
      .split(spaceOrPeriodRegex);
    const highlightRegex = new RegExp(`(${queryParts.join('|')})`, 'i');

    const [searchTime, searchResults] = await resultsPromise;

    dispatch({
      type: 'LOAD',
      payload: { searchTime, searchResults, highlightRegex },
    });
  },
  400,
);

type Props =
  | {
      disableLink?: true;
      customPlaceholderText?: string;
      onSearchSubmit?: (person: SearchResult) => void;
      searchFunction?: SearchFunction;
    }
  | {
      disableLink?: false;
      customPlaceholderText?: undefined;
      onSearchSubmit?: undefined;
      searchFunction?: SearchFunction;
    };

const GordonQuickSearch = ({
  searchFunction,
  disableLink = false,
  customPlaceholderText,
  onSearchSubmit,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, default_state);
  const [currentQuery, setCurrentQuery] = useState('');
  const [arrowSimulatedForQuery, setArrowSimulatedForQuery] = useState<string | null>(null);
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const isOnline = useNetworkStatus();
  const placeholder = !isOnline
    ? 'Offline'
    : customPlaceholderText ?? (width < BREAKPOINT_WIDTH ? 'People' : 'People Search');

  const handleInput = (_event: React.SyntheticEvent, value: string) => {
    const query = value.replace(specialCharactersRegex, '');
    setCurrentQuery(query);
    setArrowSimulatedForQuery(null);

    if (query.length >= MIN_QUERY_LENGTH) {
      dispatch({ type: 'INPUT' });
      performSearch(query, dispatch, searchFunction);
    } else {
      dispatch({ type: 'RESET' });
    }
  };
  // Ensures that when searching the first option is highlighted
  useEffect(() => {
    if (
      state.searchResults.length > 0 &&
      currentQuery.length >= MIN_QUERY_LENGTH &&
      arrowSimulatedForQuery !== currentQuery
    ) {
      const input = document.querySelector<HTMLInputElement>('input[placeholder]');
      if (input) {
        const simulateKey = (key: string) => {
          const event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key,
            code: key,
          });
          input.dispatchEvent(event);
        };
        simulateKey('ArrowDown');
        simulateKey('ArrowUp');
        setArrowSimulatedForQuery(currentQuery);
      }
    }
  }, [state.searchResults, currentQuery, arrowSimulatedForQuery]);

  const handleSubmit = (
    event: React.SyntheticEvent | KeyboardEvent,
    person: SearchResult | null,
  ) => {
    if (!person) return;

    if (person.UserName === '__ADVANCED__') {
      setCurrentQuery('');
      dispatch({ type: 'RESET' });
      navigate('/people');
      return;
    }

    disableLink ? onSearchSubmit!(person) : navigate(`/profile/${person.UserName}`);
  };

  const renderOption = (params: HTMLAttributes<HTMLLIElement>, person: SearchResult) => {
    // Bail if any required properties are missing
    if (
      state.loading ||
      !state.highlightRegex ||
      !person.UserName ||
      !person.FirstName ||
      !person.LastName
    ) {
      return null;
    }

    // on click, execute callback if link disabled, otherwise behave as link.
    const linkProps = disableLink
      ? { onClick: () => onSearchSubmit!(person) }
      : {
          component: Link,
          to: `/profile/${person.UserName}`,
        };

    const { name, username } = getHighlightedDetails(person, state.highlightRegex);

    return (
      <MenuItem
        {...params}
        {...linkProps}
        key={person.UserName}
        className={styles.suggestion}
        divider
      >
        <Typography variant="body2">{name}</Typography>
        <Typography variant="caption" component="p">
          {username}
        </Typography>
      </MenuItem>
    );
  };

  return (
    <Autocomplete
      loading={state.loading}
      loadingText="Loading..."
      noOptionsText="No results"
      options={
        currentQuery && state.searchResults.length > 0
          ? [...state.searchResults, { UserName: '__ADVANCED__' } as SearchResult]
          : state.searchResults
      }
      isOptionEqualToValue={(option, value) => option.UserName === value?.UserName}
      autoHighlight={true}
      autoSelect={false}
      value={null}
      onChange={(event, newValue) => {
        handleSubmit(event, newValue);
      }}
      onInputChange={handleInput}
      filterOptions={(options) => options}
      blurOnSelect
      forcePopupIcon={false}
      getOptionLabel={(option) =>
        option.UserName === '__ADVANCED__' ? `Advanced Search` : option.UserName
      }
      renderOption={(props, option) => {
        if (option.UserName === '__ADVANCED__') {
          return (
            // If they hover over the Advanced Search in the quick search produces this message
            <Tooltip title="Can't find who you're looking for? Try our Advanced Search.">
              <MenuItem
                {...props}
                onClick={() => {
                  setCurrentQuery('');
                  dispatch({ type: 'RESET' });
                  navigate('/people');
                }}
              >
                <Typography variant="body2">Advanced Search</Typography>
              </MenuItem>
            </Tooltip>
          );
        }

        return renderOption(props, option);
      }}
      renderInput={({ InputProps, inputProps, ...params }) => (
        <TextField
          type="search"
          placeholder={placeholder}
          className={styles.root}
          {...params}
          inputProps={{
            ...inputProps,
          }}
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
    />
  );
};

const getHighlightedDetails = (person: SearchResult, inputPartsRegex: RegExp) => {
  const usernameParts = person.UserName.split('.');

  const name =
    person.FirstName +
    // If having nickname that is unique, display that nickname
    (person.NickName && person.NickName !== person.FirstName && person.NickName !== usernameParts[0]
      ? ` (${person.NickName})`
      : '') +
    ' ' +
    person.LastName +
    // If having maiden name that is unique, display that maiden name
    (person.MaidenName &&
    person.MaidenName !== person.LastName &&
    person.MaidenName !== usernameParts[1]
      ? ` (${person.MaidenName})`
      : '');

  return {
    name: getHighlightedText(name, inputPartsRegex),
    username: getHighlightedText(person.UserName, inputPartsRegex),
  };
};

const getHighlightedText = (text: string, inputRegex: RegExp) =>
  // Split the text into parts that don't match the input regex, and parts that do.
  // Even-numbered parts (0, 2, ...) will always be parts that don't match (but may be empty)
  // e.g. 'abcabc'.split(/(ab)/) => ["", "ab", "c", "ab", "c"]
  text.split(inputRegex).map((part, index) =>
    // Odd-numbered parts match the input regex
    index % 2 === 1 ? (
      <span className={styles.matched_text} key={index}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );

/**
 * Match all characters in a string that are not:
 * - alphanumeric
 * - whitespace
 * - `'`
 * - `-`
 * - `.`
 */
const specialCharactersRegex = /[^a-zA-Z0-9'\-.\s]/gm;
/**
 * Match all instances of whitespace and `.` at the beginning and end of a string.
 */
const startingAndEndingSpacesOrPeriodsRegex = /^[\s.]+|[\s.]+$/gm;
/**
 * Match any one space or period in a string
 */
const spaceOrPeriodRegex = / |\./;

export default GordonQuickSearch;
