import React, { Component } from 'react';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';

import gordonEvent from './../../services/event';
import EventItem from './components/EventItem';
import GordonLoader from '../../components/Loader';

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
      events: [],
      filteredEvents: [],
      loading: true,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
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

  async loadEvents() {
    this.setState({ loading: true });
    const events = await gordonEvent.getFutureEvents();
    this.setState({ events, loading: false, filteredEvents: events });
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
    return (
      <section>
        <Grid container justify="center">
          <Grid container alignItems="baseline">
            <Grid item xs={8} md={10} lg={5}>
              <TextField
                id="search"
                label="Search"
                value={this.state.search}
                onChange={this.search('search')}
                margin="none"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} md={2} lg={3}>
              <Button raised color="primary" onClick={this.handleExpandClick}>
                Filters
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={11} md={12} lg={8}>
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
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.sports} onChange={this.filterEvents('Sports')} />
                  }
                  label="Athletics"
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
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <List>{content}</List>
          </Grid>
        </Grid>
      </section>
    );
  }
}
