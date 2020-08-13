import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import gordonEvent from './../../services/event';
import EventList from '../../components/EventList';
import GordonLoader from '../../components/Loader';
import { gordonColors } from './../../theme';

import './event.scss';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
};

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      chapelCredits: false,
      art: false,
      sports: false,
      academics: false,
      cec: false,
      studentLife: false,
      calendar: false,
      admissions: false,
      fair: false,
      chapelOffice: false,
      allEvents: [],
      events: [],
      filteredEvents: [],
      includePast: false,
      loading: true,
      hasFilters: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.togglePastEvents = this.togglePastEvents.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
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
      let includePast = urlParams.has('Past') ? true : false;
      let chapelCredits = urlParams.has('CLW') ? true : false;
      let academics = urlParams.has('Academics') ? true : false;
      let admissions = urlParams.has('Admissions') ? true : false;
      let art = urlParams.has('Arts') ? true : false;
      let sports = urlParams.has('Athletics') ? true : false;
      let calendar = urlParams.has('Calendar') ? true : false;
      let cec = urlParams.has('CEC') ? true : false;
      let fair = urlParams.has('Fair') ? true : false;
      let chapelOffice = urlParams.has('ChapelOffice') ? true : false;
      let studentLife = urlParams.has('StudentLife') ? true : false;
      // Determines if any filters are activated
      let hasFilters =
        includePast ||
        chapelCredits ||
        academics ||
        admissions ||
        art ||
        sports ||
        calendar ||
        cec ||
        fair ||
        chapelOffice ||
        studentLife;

      this.setState({
        includePast,
        chapelCredits,
        academics,
        admissions,
        art,
        sports,
        calendar,
        cec,
        fair,
        chapelOffice,
        studentLife,
        hasFilters,
      });

      this.setState({ loading: true });
      const events = await gordonEvent.getFilteredEvents(this.state);
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

  filterEvents(name) {
    return async (event) => {
      this.setState({ loading: true });
      await this.setState({ [name]: event.target.checked });
      const events = await gordonEvent.getFilteredEvents(this.state);
      this.setState({ filteredEvents: events, loading: false });
      this.createURLParameters();
    };
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
    if (this.state.chapelCredits) url += '&CLW';
    if (this.state.academics) url += '&Academics';
    if (this.state.admissions) url += '&Admissions';
    if (this.state.art) url += '&Arts';
    if (this.state.sports) url += '&Athletics';
    if (this.state.calendar) url += '&Calendar';
    if (this.state.cec) url += '&CEC';
    if (this.state.chapelOffice) url += '&ChapelOffice';
    if (this.state.fair) url += '&Fair';
    if (this.state.studentLife) url += '&StudentLife';
    this.props.history.push(url);
    // Determines if any filters are activated
    let hasFilters =
      this.state.includePast ||
      this.state.chapelCredits ||
      this.state.academics ||
      this.state.admissions ||
      this.state.art ||
      this.state.sports ||
      this.state.calendar ||
      this.state.cec ||
      this.state.fair ||
      this.state.chapelOffice ||
      this.state.studentLife;
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
        includePast: false,
        chapelCredits: false,
        academics: false,
        admissions: false,
        art: false,
        sports: false,
        calendar: false,
        cec: false,
        fair: false,
        chapelOffice: false,
        studentLife: false,
      },
      async () => {
        const events = await gordonEvent.getFilteredEvents(this.state);
        this.setState({ filteredEvents: events, loading: false });
        this.createURLParameters();
      },
    );
  }

  search(name) {
    return async (event) => {
      await this.setState({
        [name]: event.target.value,
      });
      const events = await gordonEvent.getFilteredEvents(this.state);
      this.setState({ filteredEvents: events, loading: false });
    };
  }

  async togglePastEvents() {
    //set events to all or to all future
    if (this.state.includePast === false) {
      this.setState({ includePast: true });
      await this.setState({ events: this.state.allEvents });
    } else {
      this.setState({ includePast: false });
      const futureEvents = gordonEvent.getFutureEvents(this.state.allEvents);
      await this.setState({ events: futureEvents });
    }
    // Gets all the events included in the past along with all filters previously active
    this.createURLParameters();
    // Filter events to reflect boxes still checked
    const events = gordonEvent.getFilteredEvents(this.state);
    this.setState({ filteredEvents: events, loading: false });
  }

  //This should be the only time we pull from the database
  async loadEvents() {
    this.setState({ loading: true });
    if (this.props.Authentication) {
      const allEvents = await gordonEvent.getAllEventsFormatted(); //Retrieve all events from database
      const events = gordonEvent.getFutureEvents(allEvents); //Filter out past events initially
      this.setState({ allEvents, events, loading: false, filteredEvents: events });
    } else {
      const allEvents = await gordonEvent.getAllGuestEventsFormatted(); //Retrieve all Guest events from database
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

  render() {
    let content;
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

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
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.chapelCredits}
                  onChange={this.filterEvents('chapelCredits')}
                />
              }
              label="CL&amp;W Credit"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.includePast} onChange={this.togglePastEvents} />
              }
              label="Include Past"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.academics}
                  onChange={this.filterEvents('academics')}
                />
              }
              label="Academics"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.admissions}
                  onChange={this.filterEvents('admissions')}
                />
              }
              label="Admissions"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.art} onChange={this.filterEvents('art')} />}
              label="Arts"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.sports} onChange={this.filterEvents('sports')} />
              }
              label="Athletics"
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.calendar} onChange={this.filterEvents('calendar')} />
              }
              label="Calendar"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.cec} onChange={this.filterEvents('cec')} />}
              label="CEC"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.chapelOffice}
                  onChange={this.filterEvents('chapelOffice')}
                />
              }
              label="Chapel Office"
            />

            <FormControlLabel
              control={<Checkbox checked={this.state.fair} onChange={this.filterEvents('fair')} />}
              label="Fair or Expos"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.studentLife}
                  onChange={this.filterEvents('studentLife')}
                />
              }
              label="Student Life"
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
                  onChange={this.search('search')}
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
                {this.props.Authentication && (
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
          {/* List of Events */}
          <Grid item xs={12} md={12} lg={8}>
            {filter}
            {content}
          </Grid>
        </section>
      );
    }
    return events;
  }
}
