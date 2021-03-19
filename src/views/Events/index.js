import React, { Component } from 'react';
import gordonEvent, { EVENT_FILTERS } from './../../services/event';
import EventList from '../../components/EventList';
import GordonLoader from '../../components/Loader';
import { gordonColors } from './../../theme';

import './event.scss';
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
};

// const formControl = {
//   minWidth: 120,
//   maxWidth: 300,
// };

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      allEvents: [],
      events: [],
      filteredEvents: [],
      includePast: false,
      loading: true,
      hasFilters: false,
      filters: [],
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.togglePastEvents = this.togglePastEvents.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.isMobileView = false;
    this.breakpointWidth = 540;
  }

  componentDidUpdate() {
    window.onpopstate = () => {
      if (!window.location.href.includes('?')) {
        window.location.reload();
      } else {
        this.loadEvents();
      }
    };
  }

  componentDidMount() {
    this.loadEvents();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  //this loads the filters based on the URL params- this will allow for back button and linking
  async loadPrevious() {
    if (window.location.href.includes('?')) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const filtersFromURL = [];
      let includePast = false;

      // Determines if any filters are activated
      for (const key of urlParams.keys()) {
        if (key === 'Past') {
          includePast = true;
        } else {
          filtersFromURL.push(key);
        }
      }

      let hasFilters = includePast || filtersFromURL.length > 0;

      this.setState({
        includePast,
        filters: filtersFromURL,
        loading: true,
      });

      const events = gordonEvent.getFilteredEvents(
        this.state.allEvents,
        filtersFromURL,
        this.state.search,
      );
      console.log('Got filtered events in LoadPrevious:', events);
      this.setState({ filteredEvents: events, loading: false, open: hasFilters ? true : false });

      // If the include past filter is on, we get the events from the past
      if (this.state.includePast) {
        /* When togglePastEvents() runs, it changes the state of includePast to its opposite.
         * So, when includePast is true, we set it to false so that togglePastEvents() will set it
         * back to true
         */
        this.setState({ includePast: false }, () => {
          this.togglePastEvents();
        });
      }
    }
  }

  /**
   * Creates an updated URL depending on the state
   *
   * A new URL is created when a filter is applied. This new url is added to the browser's history
   * to allow the user to use the back button and view previous search results
   */
  createURLParameters() {
    let url = '?';
    if (this.state.includePast) url += '&Past';
    url = this.state.filters.reduce(
      (url, filter) => (url += `&${encodeURIComponent(filter)}`),
      url,
    );
    console.log('Built url params:', url);
    this.props.history.push(url);
    // Determines if any filters are activated
    let hasFilters = this.state.includePast || this.state.filters.length > 0;
    this.setState({ hasFilters });
  }

  handleExpandClick() {
    // If there are any filters applied, then we reset all of them
    if (this.state.hasFilters) {
      this.clearFilters();
    }
    // Opens or closes the filter list
    this.setState({ open: !this.state.open });
  }

  clearFilters() {
    this.setState(
      {
        includePast: true,
        filters: [],
      },
      async () => {
        // Set includePast to true above so that it is "toggled" to false by the below method
        // This will ensure we filter only future events
        await this.togglePastEvents();
      },
    );
  }

  search(event) {
    this.setState({
      loading: true,
      search: event.target.value,
    });
    const events = gordonEvent.getFilteredEvents(
      this.state.events,
      this.state.filters,
      event.target.value,
    );
    this.setState({ filteredEvents: events, loading: false });
  }

  async togglePastEvents() {
    //set events to all or to all future
    if (this.state.includePast === false) {
      this.setState({ includePast: true });
      this.setState({ events: this.state.allEvents });
    } else {
      this.setState({ includePast: false });
      const futureEvents = gordonEvent.getFutureEvents(this.state.allEvents);
      this.setState({ events: futureEvents });
    }
    // Gets all the events included in the past along with all filters previously active
    this.createURLParameters();
    // Filter events to reflect boxes still checked
    const events = gordonEvent.getFilteredEvents(
      this.state.events,
      this.state.filters,
      this.state.search,
    );
    this.setState({ filteredEvents: events, loading: false });
  }

  //This should be the only time we pull from the database
  async loadEvents() {
    this.setState({ loading: true });
    if (this.props.authentication) {
      const allEvents = await gordonEvent.getAllEvents(); //Retrieve all events from database
      const events = gordonEvent.getFutureEvents(allEvents); //Filter out past events initially
      this.setState({ allEvents, events, loading: false, filteredEvents: events });
    } else {
      const allEvents = await gordonEvent.getAllGuestEvents(); //Retrieve all Guest events from database
      const events = gordonEvent.getFutureEvents(allEvents); //Filter out past events initially
      this.setState({ allEvents, events, loading: false, filteredEvents: events });
    }
    //called to handle set filters
    this.loadPrevious();
  }

  //Has to rerender on screen resize in order for table to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  handleChange = async (event) => {
    this.setState({ loading: true, filters: event.target.value });
    const events = gordonEvent.getFilteredEvents(
      this.state.events,
      event.target.value,
      this.state.search,
    );
    this.setState({ loading: false, filteredEvents: events });
  };

  render() {
    console.log('Rendering events with state', this.state);
    let content;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events.length > 0) {
      content = <EventList events={this.state.filteredEvents} />;
    }

    let filter;
    if (this.state.loading === true) {
    } else {
      filter = (
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <FormGroup row>
            <FormControl>
              <InputLabel id="event-filters">Events</InputLabel>
              <Select
                labelId="event-filters"
                id="event-checkboxes"
                multiple
                value={this.state.filters}
                onChange={this.handleChange}
                input={<Input />}
                renderValue={(selected) => (
                  <div className="filter-chips">
                    {selected.map((value) => (
                      <Chip key={value} label={value} className="filter-chip" />
                    ))}
                  </div>
                )}
                // MenuProps={MenuProps}
              >
                {EVENT_FILTERS.map((filterName) => (
                  <MenuItem
                    key={filterName}
                    value={filterName}
                    // style={getStyles(filterName, personName, theme)}
                  >
                    {filterName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox checked={this.state.includePast} onChange={this.togglePastEvents} />
              }
              label="Include Past"
            />
          </FormGroup>
        </Collapse>
      );
    }

    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',

        attendedEvents: {
          background: gordonColors.primary.cyan,
          color: 'white',
          marginLeft: '0.88rem',
        },
      },
    };
    let events = (
      <section>
        <Grid container justify="center">
          {/* Search Bar and Filters */}
          <Grid
            item
            xs={10}
            sm={12}
            md={12}
            lg={8}
            alignContent="center"
            justify="center"
            style={{ paddingBottom: '1rem' }}
          >
            <Grid container alignItems="baseline" justify="center" style={styles.searchBar}>
              <Grid container xs={12} sm={5} md={8} lg={7}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.search}
                  fullWidth
                />
              </Grid>
              <Grid
                container
                justify="flex-end"
                direction="row"
                xs={12}
                sm={6}
                md={4}
                lg={5}
                style={{ paddingTop: '1rem' }}
                className={'buttonWrapper'}
              >
                <Button variant="contained" style={style.button} onClick={this.handleExpandClick}>
                  {this.state.open && this.state.hasFilters ? 'CLEAR FILTERS' : 'FILTERS'}
                </Button>
                {this.props.authentication && (
                  <Button
                    variant="contained"
                    style={style.button.attendedEvents}
                    onClick={() => (window.location.pathname = '/attended')}
                  >
                    ATTENDED CL&amp;W
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* List of Events */}
          <Grid item xs={12} md={12} lg={8}>
            {filter}
            {content}
          </Grid>
        </Grid>
      </section>
    );

    return events;
  }
}
