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
    // Single use - Loads events data on page load / authentication
    const loadEventsPage = async () => {
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
    loadEventsPage();
  }, [props.authentication]);

  // Pull data from the URL anytime it loads/changes
  useEffect(() => {
    const loadURLParams = async () => {
      // Load filters from UrlParams if they exist
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
      // this check prevents 'filters' dependants from being run unnecessarily
      // (array changes [] -> [] are different memory objects)
      // note: this requires filter arrays to be in same order, which they are
      if(JSON.stringify(filters) !== JSON.stringify(filtersFromURL)) {
        setFilters(filtersFromURL);
      }
      setIncludePast(willIncludePast);
      setOpen(willIncludePast || filtersFromURL.length > 0);
    }
    console.log("Pulling data from URL (location.search change)", props.location.search);
    loadURLParams();
  // ESLint Disable Justification:
  // Adding filters as a dependency would cause the URL params to take presendence over real filters
  // Ex. filters and filtersFromURL currently in sync -> filter added -> now out of sync
  // so then we setFilters(filtersFromURL); however, URL is secondary
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search]);

  // Browser 'back' arrow
  // window.onpopstate = () => {
  //   if (!window.location.href.includes('?')) {
      
  //   }
  //   loadFiltersFromURL();
  //   console.log("pop");
  // };

  // Combined - no good because of toggle
  // useEffect(() => {
  //   const loadEventsTest = async () => {
  //     console.log("start");
  //     setFilteredEvents(await gordonEvent.getFilteredEvents(includePast ? allEvents : futureEvents, filters, search));
  //     setLoading(false);
  //     console.log("end");
  //   }
  //   loadEventsTest();
  // }, [includePast, allEvents, futureEvents, filters, search]);

  // When the actual events data changes update the events
  useEffect(() => {
    console.log("set all events", includePast);
    // setLoading(true);
    setEvents(includePast ? allEvents : futureEvents);
  }, [includePast, allEvents, futureEvents]);

  // Apply filters to the events data
  useEffect(() => {
    const loadFilteredEvents = async() => {
      setFilteredEvents(gordonEvent.getFilteredEvents(events, filters, search));
    }
    console.log("loadFilteredEvents", events.length, filters, search);
    loadFilteredEvents();
  }, [events, filters, search]);

  // Update the URL when filters change
  useEffect(() => {
    const setURLParams = (includePast, filters) => {
      // if there are filters set, push them to url; otherwise, push empty params
      if (includePast || filters.length > 0) {
        let url = '?';
        if (includePast) url += '&Past';
        url = filters.reduce((url, filter) => (url += `&${encodeURIComponent(filter)}`), url);
        props.history.push(url);
        // console.log("pushing", url);
      } else {
        props.history.push();
        // console.log("pushing ()");
      }
    };
    console.log("setURLParams", filters, includePast, props.history, props.history.location);
    setURLParams(includePast, filters);
  // ESLint Disable Justification:
  // Setting url pushes to history, which we do not want to then set the url again
  // so we have removed props.history from dependency list
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, includePast]);

  const handleExpandClick = () => {
    clearFilters();
    setOpen(!open);
  };

  const clearFilters = () => {
    setIncludePast(false);
    // this check prevents 'filters' dependants from being run unnecessarily
    // (array changes [] -> [] are different memory objects)
    if(filters.length) {
      setFilters([]);
    }
  };

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (filteredEvents.length > 0) {
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
            onChange={(event) => {setFilters(event.target.value)}}
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
