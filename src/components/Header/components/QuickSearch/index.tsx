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
import React from 'react';

const MIN_QUERY_LENGTH = 2;
const BREAKPOINT_WIDTH = 450;

const default_state = {
  loading: false,
  searchTime: 0,
  searchResults: [] as SearchResult[],
  highlightRegex: null,
} as const satisfies State;

// State type definition
type State = {
  loading: boolean;
  searchTime: number;
  searchResults: SearchResult[];
  highlightRegex: RegExp | null;
};

// Action types for the reducer
type Action =
  | { type: 'INPUT' }
  | { type: 'LOAD'; payload: Omit<State, 'loading'> }
  | { type: 'RESET' };

// Reducer to manage loading and search result state
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

// Search function type
type SearchFunction = (
  query: string,
) => Promise<[searchTime: number, searchResults: SearchResult[]]>;

// Perform search after debounce, and dispatch results
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

// Props accepted by the component

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

  // Handle search input change
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

  // Handle selection of a result or advanced search
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

  // Render a single search result
  const renderOption = (params: HTMLAttributes<HTMLLIElement>, person: SearchResult) => {
    if (
      state.loading ||
      !state.highlightRegex ||
      !person.UserName ||
      !person.FirstName ||
      !person.LastName
    ) {
      return null;
    }

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
            <Tooltip title="Can't find who you're looking for? Try our Advanced Search.">
              <MenuItem
                {...props}
                onClick={() => {
                  setCurrentQuery('');
                  dispatch({ type: 'RESET' });
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
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

// Helper: highlight matched portions of names
const getHighlightedDetails = (person: SearchResult, inputPartsRegex: RegExp) => {
  const usernameParts = person.UserName.split('.');

  const name =
    person.FirstName +
    (person.NickName && person.NickName !== person.FirstName && person.NickName !== usernameParts[0]
      ? ` (${person.NickName})`
      : '') +
    ' ' +
    person.LastName +
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

// Helper: wraps matching parts of text in span
const getHighlightedText = (text: string, inputRegex: RegExp) =>
  text.split(inputRegex).map((part, index) =>
    index % 2 === 1 ? (
      <span className={styles.matched_text} key={index}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );

// Regex for invalid characters in search
const specialCharactersRegex = /[^a-zA-Z0-9'.-\s]/gm;
const startingAndEndingSpacesOrPeriodsRegex = /^[\s.]+|[\s.]+$/gm;
const spaceOrPeriodRegex = / |\./;

export default GordonQuickSearch;

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
