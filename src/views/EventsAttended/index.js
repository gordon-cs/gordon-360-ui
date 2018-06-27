import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core/ExpansionPanel';
import user from './../../services/user';
import session from './../../services/session';
import gordonEvent from './../../services/event';
import GordonLoader from '../../components/Loader';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
};

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      events: [],
      filteredEvents: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.loadEvents();
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
    const { user_name: username } = user.getLocalInfo();
    const termCode = session.getTermCode();
    const events = await user.getAttendedChapelEvents(username, termCode);
    this.setState({ events, loading: false, filteredEvents: events });
  }
  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events.length > 0) {
      content = this.state.filteredEvents.map(currEvent => (
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid item xs={8} sm={9} md={10}>
                <Typography>{currEvent.title}</Typography>
                <Typography variant="caption">{`${currEvent.date}, ${
                  currEvent.timeRange
                }`}</Typography>
                <Typography variant="caption">{currEvent.location}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={8} sm={9} md={10}>
                <Typography>Description</Typography>
                <Typography variant="caption">{currEvent.Description}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        /*<EventItem event={currEvent} key={currEvent.Event_ID} />*/
      ));
    } else {
      content = (
        <Grid item>
          <Typography variant="display1">No Events To Show</Typography>
        </Grid>
      );
    }
    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <Grid container alignItems="baseline" style={styles.searchBar}>
              <Grid item xs={8} sm={9} md={10} lg={10}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.search('search')}
                  margin="none"
                  fullWidth
                />
              </Grid>
              {/*<Grid item xs={4} sm={3} md={2} lg={2}>
                <Button raised color="primary" onClick={this.handleExpandClick}>
                  Filters
                </Button>
                </Grid>*/}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <List>{content}</List>
          </Grid>
        </Grid>
      </section>
    );
  }
}
