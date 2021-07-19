import React, { useEffect, useMemo, useState } from 'react';
import gordonEvent, { EVENT_FILTERS } from 'services/event';
import EventList from 'components/EventList';
import GordonLoader from 'components/Loader';
import styles from './Events.module.css';
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

const Events = (props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [includePast, setIncludePast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const futureEvents = useMemo(() => gordonEvent.getFutureEvents(allEvents), [allEvents]);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      let allEvents;
      if (props.authentication) {
        allEvents = await gordonEvent.getAllEvents();
      } else {
        allEvents = await gordonEvent.getAllGuestEvents();
      }
      setAllEvents(allEvents);

      // Load filters from UrlParams if they exist
      if (props.location.search) {
        const urlParams = new URLSearchParams(props.location.search);
        let willIncludePast = false;
        const filtersFromURL = [];

        for (const key of urlParams.keys()) {
          if (key === 'Past') {
            willIncludePast = true;
          } else {
            filtersFromURL.push(key);
          }
        }

        setFilters(filtersFromURL);
        setIncludePast(willIncludePast);
        setOpen(willIncludePast || filtersFromURL.length > 0);
      }

      setLoading(false);
    };

    loadEvents();
  }, [props.authentication, props.location.search]);

  useEffect(() => {
    setEvents(includePast ? allEvents : futureEvents);
  }, [includePast, allEvents, futureEvents]);

  useEffect(() => {
    setFilteredEvents(gordonEvent.getFilteredEvents(events, filters, search));
  }, [events, filters, search]);

  const handleChangeFilters = async (event) => {
    setFilters(event.target.value);
    setURLParams(includePast, event.target.value);
  };

  const handleExpandClick = () => {
    clearFilters();
    setOpen(!open);
  };

  const clearFilters = () => {
    setIncludePast(false);
    setFilters([]);
    setURLParams(false, []);
  };

  const handleChangeIncludePast = () => {
    setIncludePast(!includePast);
    setURLParams(!includePast, filters);
  };

  const setURLParams = (includePast, filters) => {
    if (includePast || filters.length > 0) {
      let url = '?';
      if (includePast) url += '&Past';
      url = filters.reduce((url, filter) => (url += `&${encodeURIComponent(filter)}`), url);
      props.history.push(url);
    } else if (props.location.search) {
      // If no params but current url has params, then push url with no params
      props.history.push();
    }
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
            onChange={handleChangeFilters}
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
          control={<Checkbox checked={includePast} onChange={handleChangeIncludePast} />}
          label="Include Past"
        />
      </div>
    </Collapse>
  );

  return (
    <Grid container justifyContent="center" alignContent="flex-start">
      {/* Search Bar and Filters */}
      <Grid item xs={12} lg={8} className="event-buttons" container justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            id="search"
            label="Search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid container justifyContent="center" item xs={12} sm={6} md={4}>
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
