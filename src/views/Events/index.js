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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
import FilterListIcon from '@material-ui/icons/FilterList';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EventList from 'components/EventList';
import GordonLoader from 'components/Loader';
import { useEffect, useMemo, useState } from 'react';
import Media from 'react-media';
import gordonEvent, { EVENT_FILTERS } from 'services/event';
import { gordonColors } from 'theme';
import useWindowSize from 'hooks/useWindowSize';

const Events = (props) => {
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
      setHasInitializedEvents(true);

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
      props.history.push(url);
    } else if (props.location.search) {
      // If no params but current url has params, then push url with no params
      props.history.push();
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

  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={12} lg={10} xl={8}>
        <Card style={{ padding: '0 3vw' }}>
          <CardContent>
            <CardHeader title={searchPageTitle} />

            <Grid container spacing={2} direction="row">
              <Grid item xs={12} align="right">
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

              {/* Search Bar */}
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
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
                  <Grid item xs>
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

                <br />

                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  style={{ padding: '8px' }}
                >
                  <Grid item>
                    <Button
                      style={{ backgroundColor: gordonColors.neutral.lightGray }}
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
                      Filters
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <br />

            <Grid container spacing={2} direction="row">
              <Grid item xs={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
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
                    <Grid item xs>
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
                  <br />
                  <Grid container item justifyContent="center">
                    <FormControlLabel
                      control={
                        <Checkbox checked={includePast} onChange={handleChangeIncludePast} />
                      }
                      label="Include Past"
                    />
                  </Grid>
                </Collapse>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />

        {/* List of Events */}
        {content}
      </Grid>
    </Grid>
  );
};

export default Events;
