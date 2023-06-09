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
import { gordonColors } from 'theme';
import { useLocation, useNavigate } from 'react-router';
import { NoBackpackSharp } from '@mui/icons-material';

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

  /*const searchWidth = () => {
    if (width >= 1800 && width <= 1920) {
      return 5.87;
    } else if (width >= 1700 && width < 1800) {
      return 6.39;
    } else if (width >= 1600 && width < 1700) {
      return 6.91;
    } else if (width >= 1500 && width < 1600) {
      return 7.43;
    } else if (width >= 1400 && width < 1500) {
      return 7.95;
    } else if (width >= 1300 && width < 1400) {     //I tried to make a function to check the window size and adjust the search bar's width accordingly-I can't get it to work. I may come back to it eventually
      return 8.47;
    } else if (width >= 1200 && width < 1300) {
      return 8.99;
    } else if (width >= 1100 && width < 1200) {
      return 9.51;
    } else if (width >= 1000 && width < 1100) {
      return 10.03;
    } else if (width >= 920 && width < 1000) {
      return 10.55;
    } else {
      return 5.87;
    }
  };*/

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
      <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
      Events
    </div>
  );

  if (width >= 920) {
    return (
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={10} xl={8}>
          <Card style={{ padding: '0 0vw' }}>
            <CardHeader
              title={searchPageTitle}
              style={{
                backgroundColor: gordonColors.primary.blue,
                color: gordonColors.neutral.grayShades[50],
              }}
            />
            <Card style={{ padding: '0 3vw' }}>
              <CardContent>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4} />
                  <Grid item xs={4} align="center"></Grid>
                  <Grid item xs={4} align="right">
                    {/*{isAuthenticated && (
                    <Button
                      color="primary"
                      style={{
                        backgroundColor: gordonColors.primary.cyan, //this was originally where the attended cl&w button code was
                        color: gordonColors.neutral.grayShades[50],
                      }}
                      variant="contained"
                      onClick={() => navigate('/attended')}
                    >
                      ATTENDED CL&amp;W
                    </Button>
                    )}*/}
                  </Grid>
                </Grid>

                {/* Search Bar and Filters */}
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12}>
                    <Grid container spacing={1.5} alignItems="center">
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
                      {/*I tried modifying the length of the search bar so all 3 
                      buttons can fit beside it. I thought about putting the Attended
                      CL&W in the header like some of the other buttons, but I think
                      it'd look better this way. The smaller screen size has all of 
                      the buttons next to each other, so I'm going to keep that here.
                      The xs below says 5.87 because it's the smallest number that
                      allows the 3 buttons to be on the same line-5.87 is the lowest
                      on 920 width, the highest I could find is 7.5 on 1920 width*/}
                      <Grid item xs={5.87}>
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

                      <Grid item>
                        {isAuthenticated && (
                          <Button
                            color="primary"
                            style={{
                              backgroundColor: gordonColors.primary.cyan,
                              color: gordonColors.neutral.grayShades[50],
                            }}
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
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item>
                              <FilterListIcon
                                style={{
                                  color: gordonColors.neutral.grayShades[900],
                                  fontSize: 20,
                                }}
                              />
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
                                <Chip
                                  label={option}
                                  style={{
                                    backgroundColor: gordonColors.primary.cyan,
                                    color: gordonColors.neutral.grayShades[50],
                                  }}
                                  {...getTagProps({ index })}
                                />
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
          <Card style={{ padding: '0 0vw' }}>
            <CardHeader
              title={searchPageTitle}
              style={{
                backgroundColor: gordonColors.primary.blue,
                color: gordonColors.neutral.grayShades[50],
              }}
            />
            <Card style={{ padding: '0 3vw' }}>
              <CardContent>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={4} />
                  <Grid item xs={4} align="center"></Grid>
                  <Grid item xs={4} align="right"></Grid>
                </Grid>

                {/* Search Bar and Filters */}
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} container spacing={2} alignItems="center">
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
                          color="primary"
                          style={{
                            backgroundColor: gordonColors.primary.cyan,
                            color: gordonColors.neutral.grayShades[50],
                          }}
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
                            <FilterListIcon
                              style={{ color: gordonColors.neutral.grayShades[900], fontSize: 20 }}
                            />
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
                              <Chip
                                label={option}
                                style={{
                                  backgroundColor: gordonColors.primary.cyan,
                                  color: gordonColors.neutral.grayShades[50],
                                }}
                                {...getTagProps({ index })}
                              />
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
          </Card>
          <br />
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
