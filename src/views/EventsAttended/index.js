import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import user from './../../services/user';
import GordonLoader from '../../components/Loader';
import EventList from './../../components/EventList';

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };
  }
  componentWillMount() {
    if (this.props.Authentication) {
      this.loadEvents();
    }
  }

  async loadEvents() {
    this.setState({ loading: true });
    const events = await user.getAttendedChapelEventsFormatted();
    this.setState({ events, loading: false });
  }
  render() {
    let content;

    if (this.props.Authentication) {
      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.events.length > 0) {
        content = <EventList events={this.state.events} />;
      } else {
        content = (
          <Grid item>
            <br />
            <br />
            <Typography variant="h4" align="center">
              No Events To Show
            </Typography>
          </Grid>
        );
      }
    } else {
      content = (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to view your attended events.</h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
    }

    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <List>{content}</List>
          </Grid>
        </Grid>
      </section>
    );
  }
}
