import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField,
  CardActions,
  Grid,
} from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import React, { useEffect, useMemo, useState } from 'react';
import gordonEvent, { Event, EVENT_FILTERS, TIME_FILTERS } from 'services/event';
import { useSearchParams } from 'react-router-dom';
import styles from './EventFilters.module.css';
import { Search } from '@mui/icons-material';

const FiltersKey = 'filters';
const IncludePastKey = 'includePast';
const DefaultTimeFilter = '2 Weeks';

type Props = {
  unfilteredEvents: Event[];
  onFilterEvents: (filteredEvents: Event[]) => void;
  setLoading: (isLoading: boolean) => void;
};

const EventFilters = ({ unfilteredEvents, onFilterEvents, setLoading }: Props) => {
  const [search, setSearch] = useState('');
  const futureEvents = useMemo(
    () => gordonEvent.getFutureEvents(unfilteredEvents),
    [unfilteredEvents],
  );
  const [timeFilter, setTimeFilter] = useState(DefaultTimeFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const includePast = useMemo(() => searchParams.get(IncludePastKey) === 'true', [searchParams]);
  const filters = useMemo(() => searchParams.getAll('filters'), [searchParams]);

  useEffect(() => {
    const events = includePast ? unfilteredEvents : futureEvents;
    const filteredEvents = gordonEvent.getFilteredEvents(events, filters, search, timeFilter);
    onFilterEvents(filteredEvents);
    setLoading(false);
  }, [
    includePast,
    unfilteredEvents,
    futureEvents,
    filters,
    search,
    timeFilter,
    onFilterEvents,
    setLoading,
  ]);

  const clearAll = () => {
    setLoading(true);
    setSearchParams(new URLSearchParams());
    setSearch('');
    setTimeFilter(DefaultTimeFilter);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoading(true);
    setSearch(event.target.value);
  };

  const handleChangeFilters = (_event: unknown, filters: string[]) => {
    setLoading(true);
    setSearchParams((prev) => {
      prev.delete(FiltersKey);
      filters.forEach((filter) => prev.append(FiltersKey, filter));
      return prev;
    });
  };

  const handleChangeIncludePast = () => {
    setLoading(true);
    setSearchParams((prev) => {
      const didInclude = prev.get(IncludePastKey) === 'true';
      const willInclude = !didInclude;

      if (willInclude) {
        prev.set(IncludePastKey, willInclude.toString());
      } else {
        prev.delete(IncludePastKey);
      }

      return prev;
    });
  };

  const handleChangeTimeWindow = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLoading(true);
    setTimeFilter(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={
          <>
            Search
            <b className={styles.events_gordon_text}> Gordon </b>
            Events
          </>
        }
        className="gc360_header"
        id="top"
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="search"
              label="Search"
              type="search"
              variant="filled"
              value={search}
              onChange={handleChangeSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className={styles.events_icon} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              id="event-filters"
              multiple
              options={EVENT_FILTERS}
              value={filters}
              onChange={handleChangeFilters}
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} color="secondary" />
                ))
              }
              renderInput={(param) => <TextField {...param} variant="filled" label="Event Type" />}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              value={timeFilter}
              onChange={handleChangeTimeWindow}
              select
              label="Time Window"
              variant="filled"
              fullWidth
            >
              <MenuItem value="" key="All">
                <em>All</em>
              </MenuItem>
              {TIME_FILTERS.map((timeFilter) => (
                <MenuItem value={timeFilter} key={timeFilter}>
                  {timeFilter}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includePast}
                  onChange={handleChangeIncludePast}
                  color="secondary"
                />
              }
              label="Show Past Events"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button color="neutral" variant="contained" onClick={clearAll}>
          CLEAR ALL
        </Button>

        <Button
          variant="contained"
          color="secondary"
          component={HashLink}
          to="#bottom"
          smooth
          id="top"
        >
          Jump to Bottom
        </Button>
      </CardActions>
    </Card>
  );
};
export default EventFilters;
