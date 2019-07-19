import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import gordonEvent from './../../services/event';
import EventList from '../../components/EventList';
import GordonLoader from '../../components/Loader';

//import './event.css';

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
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.togglePastEvents = this.togglePastEvents.bind(this);
    this.isMobileView = false;
    this.breakpointWidth = 540;
  }
  componentWillMount() {
    this.loadEvents();
  }
  filterEvents(name) {
    return async event => {
      this.setState({ loading: true });
      await this.setState({ [name]: event.target.checked });
      const events = await gordonEvent.getFilteredEvents(this.state);
      this.setState({ filteredEvents: events, loading: false });
    };
  }
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }
  search(name) {
    return async event => {
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
    //filter events to reflect boxes still checked
    const events = gordonEvent.getFilteredEvents(this.state);
    this.setState({ filteredEvents: events, loading: false });
  }

  //This should be the only time we pull from the database
  async loadEvents() {
    this.setState({ loading: true });
    const allEvents = await gordonEvent.getAllEventsFormatted(); //Retrieve all events from database
    const events = gordonEvent.getFutureEvents(allEvents); //Filter out past events initially
    this.setState({ allEvents, events, loading: false, filteredEvents: events });
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

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events.length > 0) {
      content = <EventList events={this.state.filteredEvents} />;
    } else {
      content = (
        <Grid item>
          <Typography variant="display1">No Events To Show</Typography>
        </Grid>
      );
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
              label="Calendar Events"
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

    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <Grid container alignItems="baseline" style={styles.searchBar} spacing={8}>
              <Grid item xs={7} sm={10} md={6} lg={6}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.search('search')}
                  margin="none"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={2} md={2} lg={2} align="center">
                <Button variant="contained" color="primary" onClick={this.handleExpandClick}>
                  Filters
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={2} lg={2}>
                <FormControlLabel
                  control={<Switch onChange={this.togglePastEvents} />}
                  label="Include Past"
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2} lg={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.chapelCredits}
                      onChange={this.filterEvents('chapelCredits')}
                      aria-label="chapelCredits"
                    />
                  }
                  label="CL&amp;W Only"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            {filter}
            {content}
          </Grid>
        </Grid>
      </section>
    );
  }
}
