import { useIsAuthenticated } from '@azure/msal-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Collapse,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete from '@mui/material/Autocomplete';
import EventList from 'components/EventList';
import GordonLoader from 'components/Loader';
import { useWindowSize } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import Media from 'react-media';
import gordonEvent, { EVENT_FILTERS } from 'services/event';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Events.module.css';

const Events = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [includePast, setIncludePast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [hasInitializedEvents, setHasInitializedEvents] = useState(false);
  const futureEvents = useMemo(() => gordonEvent.getFutureEvents(allEvents), [allEvents]);
  const [width] = useWindowSize();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      let allEvents;
      if (isAuthenticated) {
        allEvents = await gordonEvent.getAllEvents();
      } else {
        allEvents = await gordonEvent.getAllGuestEvents();
      }
      setAllEvents(allEvents);
      setHasInitializedEvents(true);

      // Load filters from UrlParams if they exist
      if (location.search) {
        const urlParams = new URLSearchParams(location.search);
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
  }, [isAuthenticated, location.search]);

  useEffect(() => {
    setLoading(true);
    setEvents(includePast ? allEvents : futureEvents);
    setLoading(false);
  }, [includePast, allEvents, futureEvents]);

  useEffect(() => {
    setFilteredEvents(gordonEvent.getFilteredEvents(events, filters, search));
  }, [events, filters, search]);

  const handleChangeFilters = async (value) => {
    setFilters(value);
    setURLParams(includePast, value);
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
      navigate(url);
    } else if (location.search) {
      // If no params but current url has params, then push url with no params
      navigate();
    }
  };

  let content;

  if (loading || !hasInitializedEvents) {
    content = <GordonLoader />;
  } else {
    content = <EventList events={filteredEvents} loading={loading} />;
  }

  const searchPageTitle = (
    <div align="center">
      Search
      <b className={styles.searchPageTitle}> Gordon </b>
      Events
    </div>
  );

  if (width >= 920) {
    return (
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={10} xl={8}>
          <Card className={styles.card_style}>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4} />
                <Grid item xs={4} align="center">
                  <CardHeader title={searchPageTitle} />
                </Grid>
                <Grid item xs={4} align="right">
                  {isAuthenticated && (
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => navigate('/attended')}
                    >
                      ATTENDED CL&amp;W
                    </Button>
                  )}
                </Grid>
              </Grid>

              {/* Search Bar and Filters */}
              <Grid container spacing={2} direction="row">
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Media
                      query="(min-width: 600px)"
                      render={() => (
                        <Grid item>
                          <EventIcon className={styles.event_filter_icon} />
                        </Grid>
                      )}
                    />
                    <Grid item xs={8}>
                      <TextField
                        id="search"
                        label="Search"
                        type="search"
                        variant="filled"
                        fullWidth
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                      />
                    </Grid>

                    <Grid item>
                      <Button color="neutral" fullWidth variant="contained" onClick={clearAll}>
                        CLEAR ALL
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        color={filters.length === 0 ? 'primary' : 'secondary'}
                        variant={open ? 'contained' : 'outlined'}
                        onClick={handleExpandClick}
                      >
                        <AddIcon fontSize="inherit" />
                        Filters
                      </Button>
                    </Grid>
                  </Grid>
                  <br />
                </Grid>

                <Grid item xs={12}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid container spacing={2} alignItems="center">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FilterListIcon className={styles.event_filter_list_icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={8}>
                        <Autocomplete
                          id="event-filters"
                          multiple
                          fullWidth
                          options={EVENT_FILTERS}
                          onChange={(event, value) => {
                            handleChangeFilters(value);
                          }}
                          filterSelectedOptions
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip label={option} {...getTagProps({ index })} color="secondary" />
                            ))
                          }
                          value={filters}
                          renderInput={(param) => (
                            <TextField {...param} variant="filled" label="Filters" />
                          )}
                        />
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
  } else if (width < 920) {
    return (
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={10} xl={8}>
          <Card className={styles.card_style}>
            <CardContent>
              <Grid container item xs={12} justifyContent="center">
                <CardHeader title={searchPageTitle} />
              </Grid>

              {/* Search Bar and Filters */}
              <Grid container spacing={2} direction="row">
                <Grid item xs={12} container spacing={2} alignItems="center">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item>
                        <EventIcon className={styles.event_icon} />
                      </Grid>
                    )}
                  />
                  <Grid item xs={11}>
                    <TextField
                      id="search"
                      label="Search"
                      type="search"
                      variant="filled"
                      fullWidth
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button fullWidth color="neutral" variant="contained" onClick={clearAll}>
                      CLEAR ALL
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      color={filters.length === 0 ? 'primary' : 'secondary'}
                      variant={open ? 'contained' : 'outlined'}
                      onClick={handleExpandClick}
                    >
                      <AddIcon fontSize="inherit" />
                      Filters
                    </Button>
                  </Grid>

                  <Grid item>
                    {isAuthenticated && (
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => navigate('/attended')}
                      >
                        ATTENDED CL&amp;W
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Grid container item justifyContent="center">
                    <FormControlLabel
                      control={
                        <Checkbox checked={includePast} onChange={handleChangeIncludePast} />
                      }
                      label="Include Past"
                    />
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Media
                      query="(min-width: 600px)"
                      render={() => (
                        <Grid item>
                          <FilterListIcon className={styles.event_filter_list_icon} />
                        </Grid>
                      )}
                    />
                    <Grid item xs={11}>
                      <Autocomplete
                        id="event-filters"
                        multiple
                        fullWidth
                        options={EVENT_FILTERS}
                        onChange={(event, value) => {
                          handleChangeFilters(value);
                        }}
                        filterSelectedOptions
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} color="secondary" />
                          ))
                        }
                        renderInput={(param) => (
                          <TextField {...param} variant="filled" label="Filters" />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </CardContent>
          </Card>

          {/* List of Events */}
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Events;
