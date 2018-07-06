import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import gordonEvent from './../../services/event';
import EventItem from './components/EventItem';
import GordonLoader from '../../components/Loader';
import { gordonColors } from '../../theme';

import './event.css';

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
  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events) {
      content = this.state.filteredEvents.map(currEvent => (
        <EventItem event={currEvent} key={currEvent.Event_ID} />
      ));
    }

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <Grid container alignItems="baseline" style={styles.searchBar} spacing={8}>
              <Grid item xs={4} sm={8} md={8} lg={8}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.search('search')}
                  margin="none"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={2} md={2} lg={2}>
                <Button variant="contained" color="primary" onClick={this.handleExpandClick}>
                  Filters
                </Button>
              </Grid>
              <Grid item xs={4} sm={2} md={2} lg={2}>
                <FormControlLabel
                  control={<Switch onChange={this.togglePastEvents} />}
                  label="Include Past"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
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
                  control={
                    <Checkbox checked={this.state.art} onChange={this.filterEvents('art')} />
                  }
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
                    <Checkbox
                      checked={this.state.calendar}
                      onChange={this.filterEvents('calendar')}
                    />
                  }
                  label="Calendar Events"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.cec} onChange={this.filterEvents('cec')} />
                  }
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
                  control={
                    <Checkbox
                      checked={this.state.studentLife}
                      onChange={this.filterEvents('studentLife')}
                    />
                  }
                  label="Student Life"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.fair} onChange={this.filterEvents('fair')} />
                  }
                  label="Fair or Expos"
                />
              </FormGroup>
              <Divider light />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.chapelCredits}
                      onChange={this.filterEvents('chapelCredits')}
                      aria-label="chapelCredits"
                    />
                  }
                  label="CL&W"
                />
              </FormGroup>
            </Collapse>
            <Card>
              <div style={headerStyle}>
                <Grid container direction="row">
                  <Grid item xs={4}>
                    <Typography variant="body2" style={headerStyle}>
                      EVENT
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" style={headerStyle}>
                      LOCATION
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" style={headerStyle}>
                      DATE & TIME
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid>
                <List className="event-list">{content}</List>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }
}
