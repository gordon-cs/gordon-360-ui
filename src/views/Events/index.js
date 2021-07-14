import React, { useEffect, useMemo, useState } from 'react';
import EventList from 'components/EventList';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
import Media from 'react-media';
import gordonEvent, { EVENT_FILTERS } from 'services/event';
import GordonLoader from 'components/Loader';
import { gordonColors } from 'theme';

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

  const handleDeleteFilters = async (value) => {
    const index = filters.indexOf(value);
    if (index > -1) {
      let filter = filters.slice(0, index).concat(filters.slice(index + 1, filters.length));
      setURLParams(includePast, filter);
      setFilters(filter);
    }
  };

  const handleExpandClick = () => {
    setOpen(!open);
  };

  const clearAll = () => {
    setIncludePast(false);
    setFilters([]);
    setURLParams(false, []);
    setSearch('');
    setOpen(false);
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

  const searchPageTitle = (
    <div align="center">
      Search
      <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
      Events
    </div>
  );

  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={12} lg={10} xl={8}>
        <Card style={{ padding: '0 3vw' }}>
          <CardContent>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={9} alignItems="left">
                <CardHeader title={searchPageTitle} />
              </Grid>
              <Grid item xs={3} alignItems="right">
                {props.authentication && (
                  <Button
                    color="primary"
                    style={{
                      backgroundColor: gordonColors.primary.cyan,
                      color: gordonColors.neutral.grayShades[50],
                    }}
                    variant="contained"
                    onClick={() => props.history.push('/attended')}
                  >
                    ATTENDED CL&amp;W
                  </Button>
                )}
              </Grid>
            </Grid>

            {/* Search Bar and Filters */}
            <Grid container spacing={2} direction="row">
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="flex-end">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item>
                        <EventIcon
                          style={{ color: gordonColors.neutral.grayShades[900], fontSize: 20 }}
                        />
                      </Grid>
                    )}
                  />
                  <Grid item xs={11}>
                    <TextField
                      id="search"
                      label="Search"
                      type="search"
                      fullWidth
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <br />

                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                  style={{ padding: '8px' }}
                >
                  <Grid item>
                    <Button
                      style={{ backgroundColor: gordonColors.neutral.lightGray }}
                      fullWidth
                      variant="contained"
                      onClick={clearAll}
                    >
                      CLEAR ALL
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      color={filters.length === 0 ? 'primary' : ''}
                      style={
                        filters.length !== 0
                          ? {
                              backgroundColor: gordonColors.primary.cyan,
                              color: gordonColors.neutral.grayShades[50],
                            }
                          : {}
                      }
                      variant={open ? 'contained' : 'outlined'}
                      onClick={handleExpandClick}
                    >
                      <AddIcon fontSize="inherit" />
                      SEARCH BY TYPE
                    </Button>
                  </Grid>

                  <Grid container item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={includePast} onChange={handleChangeIncludePast} />
                      }
                      label="Include Past"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Grid container spacing={2} alignItems="flex-end">
                    <Media
                      query="(min-width: 600px)"
                      render={() => (
                        <Grid item>
                          <FilterListIcon
                            style={{ color: gordonColors.neutral.grayShades[900], fontSize: 20 }}
                          />
                        </Grid>
                      )}
                    />
                    <Grid item xs={11}>
                      <FormControl fullWidth>
                        <InputLabel id="event-filters">Types</InputLabel>
                        <Select
                          labelId="event-filters"
                          id="event-checkboxes"
                          value={filters}
                          onChange={handleChangeFilters}
                          renderValue={(selected) => (
                            <div>
                              {selected.map((value) => (
                                <Chip
                                  onMouseDown={(event) => {
                                    event.stopPropagation();
                                  }}
                                  label={value}
                                  onDelete={() => handleDeleteFilters(value)}
                                  style={{
                                    backgroundColor: gordonColors.primary.cyan,
                                    color: gordonColors.neutral.grayShades[50],
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          multiple
                        >
                          {EVENT_FILTERS.map((filterName) => (
                            <MenuItem key={filterName} value={filterName}>
                              <Checkbox checked={filters.indexOf(filterName) > -1} />
                              <ListItemText primary={filterName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <br />

        {/* List of Events */}
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Events;
