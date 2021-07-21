import React, { Component } from 'react';
import CollapsableEventItem from './components/CollapsableEventItem';
import EventItem from './components/EventItem';
import { gordonColors } from 'theme';

import styles from './EventList.module.css';

import { List, Grid, Typography, Card } from '@material-ui/core';

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      open: false,
    };
    this.breakpointWidth = 540;
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
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
    const { events } = this.props;
    let content;
    let header;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    /****** HEADER ******/
    // Show single "events" column on narrow viewports
    if (window.innerWidth < this.breakpointWidth) {
      content = events.map((currEvent) => (
        <CollapsableEventItem event={currEvent} key={currEvent.Event_ID} />
      ));

      header = (
        <div style={headerStyle}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="body2" style={headerStyle}>
                EVENTS
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
    } else if (events.length > 0) {
      content = events.map((currEvent) => <EventItem event={currEvent} key={currEvent.Event_ID} />);
    } else if (events.length === 0) {
      content = <Typography variant="h5">No Events To Show</Typography>;
    }

    header = (
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
          <Grid item xs={2}>
            <Typography variant="body2" style={headerStyle}>
              DATE
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" style={headerStyle}>
              TIME
            </Typography>
          </Grid>
        </Grid>
      </div>
    );

    return (
      <section>
        <Card>
          {header}
          <Grid>
            <List className={styles.event-list} disablePadding>
              {content}
            </List>
          </Grid>
        </Card>
      </section>
    );
  }
}
