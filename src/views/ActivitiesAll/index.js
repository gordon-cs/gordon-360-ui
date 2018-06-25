import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';

import './activities-all.css';
import activity from '../../services/activity';
import session from '../../services/session';
import GordonActivityGrid from './components/ActivityGrid';
import GordonLoader from '../../components/Loader';

export default class GordonActivitiesAll extends Component {
  constructor(props) {
    super(props);

    this.changeSession = this.changeSession.bind(this);
    this.filter = this.filter.bind(this);

    this.state = {
      activities: [],
      allActivities: [],
      error: null,
      loading: true,
      search: '',
      session: '',
      sessions: [],
      type: '',
      types: [],
    };
  }
  async componentWillMount() {
    this.setState({ loading: true });

    try {
      const { SessionCode: sessionCode } = await session.getCurrent();
      this.setState({ session: sessionCode });

      const [activities, types, sessions] = await Promise.all([
        activity.getAll(sessionCode),
        activity.getTypes(sessionCode),
        session.getAll(),
      ]);

      this.setState({
        activities,
        allActivities: activities,
        loading: false,
        sessions,
        types,
      });
    } catch (error) {
      this.setState({ error });
    }
  }
  async changeSession(event) {
    await this.setState({ session: event.target.value, loading: true });
    const allActivities = await activity.getAll(this.state.session);
    const { type, search } = this.state;
    await this.setState({
      activities: activity.filter(allActivities, type, search),
      allActivities,
      loading: false,
    });
  }
  filter(name) {
    return async event => {
      await this.setState({ [name]: event.target.value });
      const { allActivities, type, search } = this.state;
      await this.setState({ activities: activity.filter(allActivities, type, search) });
    };
  }
  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <GordonActivityGrid activities={this.state.activities} sessionCode={this.state.session} />
      );
    }

    const sessionOptions = this.state.sessions.map(
      ({ SessionDescription: description, SessionCode: code }) => (
        <MenuItem label={description} value={code} key={code}>
          {description}
        </MenuItem>
      ),
    );

    const typeOptions = this.state.types.map(type => (
      <MenuItem value={type} key={type}>
        {type}
      </MenuItem>
    ));

    return (
      <section className="activities-all">
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <Grid container className="activities-filter">
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="activity-session">Session</InputLabel>
                  <Select
                    value={this.state.session}
                    onChange={this.changeSession}
                    input={<Input id="activity-session" />}
                  >
                    {sessionOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="activity-type">Type of Involvement</InputLabel>
                  <Select
                    value={this.state.type}
                    onChange={this.filter('type')}
                    input={<Input id="activity-type" />}
                  >
                    <MenuItem label="All" value="">
                      <em>All</em>
                    </MenuItem>
                    {typeOptions}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.filter('search')}
                  margin="none"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {content}
      </section>
    );
  }
}
