import React, { useEffect, useMemo, useState } from 'react';
import gordonEvent, { EVENT_FILTERS } from 'services/event';
import EventList from 'components/EventList';
import GordonLoader from 'components/Loader';
import './event.css';
import {
  Button,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import useQueryState, { types } from 'hooks/useQueryState';

const Events = (props) => {
  const [open, setOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  //TODO: useQueryState('search', types.SingleValue); - needs debouncing
  const [search, setSearch] = useState('');
  const [includePast, setIncludePast] = useQueryState('past', types.Boolean);
  const [filters, setFilters] = useQueryState('filters', types.Array);
  const [loading, setLoading] = useState(true);
  const futureEvents = useMemo(() => gordonEvent.getFutureEvents(allEvents), [allEvents]);

  useEffect(() => {
    const loadAllEventsData = async () => {
      setLoading(true);
      let allEvents;
      if (props.authentication) {
        allEvents = await gordonEvent.getAllEvents();
      } else {
        allEvents = await gordonEvent.getAllGuestEvents();
      }
      setAllEvents(allEvents);
      setLoading(false);
    };
    loadAllEventsData();
  }, [props.authentication]);

  useEffect(() => {
    setEvents(includePast ? allEvents : futureEvents);
  }, [includePast, allEvents, futureEvents]);

  useEffect(() => {
    setFilteredEvents(gordonEvent.getFilteredEvents(events, filters, search));
  }, [events, filters, search]);

  useEffect(() => {
    setOpen(filters.length > 0 || includePast);
  }, [filters.length, includePast]);

  const handleExpandClick = () => {
    clearFilters();
    setOpen(!open);
  };

  const clearFilters = () => {
    setIncludePast(false);
    setFilters([]);
  };

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (events.length > 0) {
    content = <EventList events={filteredEvents} />;
  }

  const filter = (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <div className="event-filters-wrapper">
        <FormControl>
          <InputLabel id="event-filters">Filters</InputLabel>
          <Select
            labelId="event-filters"
            id="event-checkboxes"
            multiple
            value={filters}
            onChange={(event) => setFilters(event.target.value)}
            renderValue={(selected) => (
              <div className="filter-chips">
                {selected.map((value) => (
                  <Chip key={value} label={value} className="filter-chip" />
                ))}
              </div>
            )}
            className="event-filters-select"
          >
            {EVENT_FILTERS.map((filterName) => (
              <MenuItem key={filterName} value={filterName}>
                {filterName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch checked={includePast} onChange={() => setIncludePast(!includePast)} />}
          label="Include Past"
        />
      </div>
    </Collapse>
  );

  return (
    <Grid container justify="center" alignContent="flex-start">
      {/* Search Bar and Filters */}
      <Grid item xs={12} lg={8} className="event-buttons" container justify="center">
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="search"
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid container justify="center" item xs={12} sm={6} md={4}>
          <Button variant="contained" onClick={handleExpandClick}>
            {open ? 'CLEAR FILTERS' : 'FILTERS'}
          </Button>
          {props.authentication && (
            <Button variant="contained" onClick={() => props.history.push('/attended')}>
              ATTENDED CL&amp;W
            </Button>
          )}
        </Grid>
        <Grid item>{filter}</Grid>
      </Grid>

      {/* List of Events */}
      <Grid item xs={12} lg={8}>
        {content}
      </Grid>
    </Grid>
  );
};

export default Events;
