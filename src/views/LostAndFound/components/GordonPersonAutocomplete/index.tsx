import { Autocomplete, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { HTMLAttributes, useEffect, useReducer } from 'react';
import quickSearchService, { SearchResult } from 'services/quickSearch';

interface Props {
  value?: SearchResult | null;
  onChange: (_event: any, selectedPerson: SearchResult | null) => void;
}

/* Constants */
const MIN_QUERY_LENGTH = 2;

type State = {
  loading: boolean;
  searchTime: number;
  searchResults: SearchResult[];
};

type Action =
  | { type: 'INPUT' }
  | { type: 'LOAD'; payload: Omit<State, 'loading'> }
  | { type: 'RESET' };

const defaultState: State = {
  loading: false,
  searchTime: 0,
  searchResults: [],
};

const specialCharactersRegex = /[^a-zA-Z0-9'\-.\s]/gm;

/* Helpers */
const handleInput = (
  _event: React.SyntheticEvent,
  value: string,
  dispatch: React.Dispatch<Action>,
) => {
  const query = value.trim().replace(specialCharactersRegex, '');
  if (query.length >= MIN_QUERY_LENGTH) {
    dispatch({ type: 'INPUT' });
    performSearch(query, dispatch);
  } else {
    dispatch({ type: 'RESET' });
  }
};

const performSearch = debounce(async (query: string, dispatch: React.Dispatch<Action>) => {
  try {
    const [searchTime, searchResults] = await quickSearchService.search(query);

    dispatch({
      type: 'LOAD',
      payload: {
        searchTime,
        searchResults,
      },
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    dispatch({ type: 'RESET' });
  }
}, 400);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, searchResults: [], loading: true };
    case 'LOAD': {
      if (action.payload.searchTime > state.searchTime) {
        return { ...state, ...action.payload, loading: false };
      } else {
        return state;
      }
    }
    case 'RESET':
      return defaultState;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

/* Functional component for the autocomplete */
export const GordonPersonAutocomplete: React.FC<Props> = ({ value, onChange }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    return () => {
      performSearch.cancel();
    };
  }, []);

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, person: SearchResult) => {
    const fullName = `${person.FirstName} ${person.LastName}`;
    return (
      <MenuItem {...props} key={person.UserName} divider>
        <Typography variant="body2">{fullName}</Typography>
      </MenuItem>
    );
  };

  return (
    <Autocomplete
      loading={state.loading}
      options={state.searchResults}
      isOptionEqualToValue={(option, value) => option.UserName === value.UserName}
      onInputChange={(props, value) => handleInput(props, value, dispatch)}
      onChange={onChange}
      renderOption={renderOption}
      getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          label="Search Gordon Person"
          variant="filled"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
