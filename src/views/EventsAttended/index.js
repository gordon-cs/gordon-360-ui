import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import event from './../../services/event';
import GordonLoader from '../../components/Loader';
import EventList from './../../components/EventList';
import { gordonColors } from '../../theme';

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };
  }
  componentDidMount() {
    if (this.props.authentication) {
      this.loadEvents();
    }
  }

  async loadEvents() {
    this.setState({ loading: true });
    const events = await event.getAttendedChapelEvents();
    this.setState({ events, loading: false });
  }

  render() {
    let content;

    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
    };

    if (this.props.authentication) {
      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.events.length > 0) {
        content = (
          <Grid container direction="row" justify="center" spacing="2">
            <Grid item align="center">
              <Button
                variant="contained"
                style={style.button}
                onClick={() => {
                  this.props.history.push('/events?CLW');
                }}
              >
                Need More Chapel Credits?
              </Button>
            </Grid>
            <Grid item>
              <EventList events={this.state.events} />
            </Grid>
          </Grid>
        );
      } else {
        content = (
          <Grid item align="center">
            <br />
            <br />
            <Typography variant="h4" align="center">
              No Events To Show
            </Typography>
            <br />
            <Button
              variant="contained"
              style={style.button}
              onClick={() => {
                this.props.history.push('/events?CLW');
              }}
            >
              Need More Chapel Credits?
            </Button>
          </Grid>
        );
      }
    } else {
      content = (
        <Grid container justify="center" spacing="2">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent class="cardContent">
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to view your attended events.</h4>
                <br />
                <Button
                  style={style.button}
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
      );
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
