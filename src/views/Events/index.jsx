import { useIsAuthenticated } from '@azure/msal-react';
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
  Link,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClockIcon from '@mui/icons-material/AccessTime';
import Autocomplete from '@mui/material/Autocomplete';
import EventList from 'components/EventList';
import GordonLoader from 'components/Loader';
import { useWindowSize } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
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
  const [timeFilter, setTimeFilter] = useState('2 Weeks');
  const [hasInitializedEvents, setHasInitializedEvents] = useState(false);
  const futureEvents = useMemo(() => gordonEvent.getFutureEvents(allEvents), [allEvents]);
  const [width] = useWindowSize();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const timeFilters = ['1 Week', '2 Weeks', '1 Month', '4 Months'];

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
    setFilteredEvents(gordonEvent.getFilteredEvents(events, filters, search, timeFilter));
  }, [events, filters, search, timeFilter]);

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
    setTimeFilter('');
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
      <b className={styles.events_gordon_text}> Gordon </b>
      Events
    </div>
  );

  let filterReminder;

  if (timeFilter != '') {
    filterReminder = (
      <>
        <div align="center">
          Your search is limited to {timeFilter}. Check out the top of the page if you want to
          change your filters.
        </div>
        <div align="center">
          <Button
            variant="contained"
            color="secondary"
            component={HashLink}
            to="#top"
            smooth
            id="bottom"
          >
            Jump to Top
          </Button>
        </div>
      </>
    );
  } else {
    filterReminder = (
      <>
        <div align="center">
          You have reached the end of Gordon's events. Check out the top of the page if you want to
          add filters.
        </div>
        <div align="center">
          <Button
            variant="contained"
            color="secondary"
            component={HashLink}
            to="#top"
            smooth
            id="bottom"
          >
            Jump to Top
          </Button>
        </div>
      </>
    );
  }

  if (width >= 920) {
    return (
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={10} xl={8}>
          <CardHeader title={searchPageTitle} className="gc360_header" id="top" />
          <Card style={{ padding: '0 3vw' }}>
            <CardContent>
              {/* Search Bar and Filters */}
              <Grid container spacing={2} direction="row">
                <Grid item xs={12}>
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid item>
                      <EventIcon className={styles.events_icon} />
                    </Grid>
                    <Grid item xs={true}>
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
                        color={open ? (filters.length === 0 ? 'primary' : 'secondary') : 'link'}
                        variant={open ? 'contained' : 'outlined'}
                        onClick={handleExpandClick}
                        className={open ? null : styles.events_filter_button}
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
                          component={Link}
                          href="https://iattendedapp.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ATTENDED CL&amp;W
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid container spacing={2} direction="row" alignItems="center">
                      <Grid item>
                        <FilterListIcon className={styles.events_icon} />
                      </Grid>

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
                            <TextField {...param} variant="filled" label="Event Type" />
                          )}
                        />
                      </Grid>
                      <Grid container item xs={3.25}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={includePast}
                              onChange={handleChangeIncludePast}
                              color="secondary"
                            />
                          }
                          label="Include Past"
                        />
                      </Grid>

                      <Grid item>
                        <ClockIcon className={styles.events_icon} />
                      </Grid>

                      <Grid item xs={8}>
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="event-time">Time Window</InputLabel>
                          <Select
                            labelId="event-time"
                            id="even-time"
                            value={timeFilter}
                            onChange={(event) => setTimeFilter(event.target.value)}
                          >
                            <MenuItem label="All" value="">
                              <em>All</em>
                            </MenuItem>
                            {timeFilters.map((timeFilter) => (
                              <MenuItem value={timeFilter} key={timeFilter}>
                                {timeFilter}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Collapse>
                  <Grid item container marginTop={2} justifyContent="center" alignItems="center">
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
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <br />

          {/* List of Events */}
          <Grid item xs={12}>
            {content}
          </Grid>
          <CardHeader item xs={12} className="gc360_header" title={filterReminder} id="bottom" />
        </Grid>
      </Grid>
    );
  } else if (width < 920) {
    return (
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={10} xl={8}>
          <CardHeader title={searchPageTitle} className="gc360_header" id="top" />
          <Card style={{ padding: '0 3vw' }}>
            <CardContent>
              {/* Search Bar and Filters */}
              <Grid container spacing={2} direction="row">
                <Grid item xs={12} container spacing={2} alignItems="center">
                  {width > 600 && (
                    <Grid item>
                      <EventIcon className={styles.events_icon} />
                    </Grid>
                  )}
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
                        <Checkbox
                          checked={includePast}
                          onChange={handleChangeIncludePast}
                          color="secondary"
                        />
                      }
                      label="Include Past"
                    />
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    {width > 600 && (
                      <Grid item>
                        <FilterListIcon className={styles.events_icon} />
                      </Grid>
                    )}
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
                          <TextField {...param} variant="filled" label="Event Type" />
                        )}
                      />
                    </Grid>
                    {width > 600 && (
                      <Grid item>
                        <ClockIcon className={styles.events_icon} />
                      </Grid>
                    )}
                    <Grid item xs={11}>
                      <FormControl fullWidth variant="filled">
                        <InputLabel id="event-time">Time Window</InputLabel>
                        <Select
                          labelId="event-time"
                          id="even-time"
                          value={timeFilter}
                          onChange={(event) => setTimeFilter(event.target.value)}
                        >
                          <MenuItem label="All" value="">
                            <em>All</em>
                          </MenuItem>
                          {timeFilters.map((timeFilter) => (
                            <MenuItem value={timeFilter} key={timeFilter}>
                              {timeFilter}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>
                <Grid item container marginTop={2} justifyContent="center" alignItems="center">
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          {/* List of Events */}
          <Grid item xs={12}>
            {content}
          </Grid>
          <CardHeader item xs={12} className="gc360_header" title={filterReminder} />
        </Grid>
      </Grid>
    );
  }
};
export default Events;
