import { InputAdornment, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNetworkStatus, useWindowSize } from 'hooks';
import { Dispatch, HTMLAttributes, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quickSearchService, { SearchResult } from 'services/quickSearch';
import styles from './QuickSearch.module.css';
import { debounce } from 'lodash';

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

    dispatch({ type: 'LOAD', payload: { searchTime, searchResults, highlightRegex } });
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
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const isOnline = useNetworkStatus();
  // Displays what's in the text box
  const placeholder = !isOnline ? 'Offline' : customPlaceholderText ?? 'Search';

  const handleInput = (_event: React.SyntheticEvent, value: string) => {
    const query = value.replace(specialCharactersRegex, '');

    if (query.length >= MIN_QUERY_LENGTH) {
      dispatch({ type: 'INPUT' });
      performSearch(query, dispatch, searchFunction);
    } else {
      dispatch({ type: 'RESET' });
    }
  };

  const handleSubmit = (_event: React.SyntheticEvent, result: SearchResult | null) => {
    if (!result) return;

    if (result.type === 'person') {
      disableLink ? onSearchSubmit!(result) : navigate(`/profile/${result.UserName}`);
    } else {
      // For involvements: customize action if needed
    }
  };

  const renderOption = (params: HTMLAttributes<HTMLLIElement>, result: SearchResult) => {
    if (state.loading || !state.highlightRegex) return null;

    if (result.type === 'person') {
      if (!result.UserName || !result.FirstName || !result.LastName) return null;

      const linkProps = disableLink
        ? { onClick: () => onSearchSubmit!(result) }
        : {
            component: Link,
            to: `/profile/${result.UserName}`,
          };

      const { name, username } = getHighlightedDetails(result, state.highlightRegex);

      return (
        <MenuItem
          {...params}
          {...linkProps}
          key={result.UserName}
          className={styles.suggestion}
          divider
        >
          <Typography variant="body2">{name}</Typography>
          <Typography variant="caption" component="p">
            {username}
          </Typography>
          {result.Involvements && result.Involvements.length > 0 && (
            <Typography variant="caption" component="p" className={styles.involvements}>
              {result.Involvements.join(', ')}
            </Typography>
          )}
        </MenuItem>
      );
    }

    if (result.type === 'involvement') {
      return (
        <MenuItem {...params} key={result.name} className={styles.suggestion} divider>
          <Typography variant="body2">{result.name}</Typography>
        </MenuItem>
      );
    }

    return null;
  };

  return (
    <Autocomplete
      loading={state.loading}
      loadingText="Loading..."
      noOptionsText="No results"
      options={state.searchResults}
      isOptionEqualToValue={(option, value) => {
        if (option.type === 'person' && value.type === 'person') {
          return option.UserName === value.UserName;
        }
        if (option.type === 'involvement' && value.type === 'involvement') {
          return option.name === value.name;
        }
        return false;
      }}
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
      onInputChange={handleInput}
      onChange={handleSubmit}
      renderOption={renderOption}
      getOptionLabel={(option) => {
        if ('UserName' in option && option.UserName) return option.UserName;
        if ('name' in option && option.name) return option.name;
        return '';
      }}
      filterOptions={(o) => o}
      autoComplete
      autoHighlight
      blurOnSelect
      forcePopupIcon={false}
    />
  );
};

const getHighlightedDetails = (
  person: Extract<SearchResult, { type: 'person' }>,
  inputPartsRegex: RegExp,
) => {
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

const specialCharactersRegex = /[^a-zA-Z0-9'\-.\s]/gm;
const startingAndEndingSpacesOrPeriodsRegex = /^[\s.]+|[\s.]+$/gm;
const spaceOrPeriodRegex = / |\./;

export default GordonQuickSearch;
