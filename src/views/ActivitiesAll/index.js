import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import './activities-all.css';
import activity from '../../services/activity';
import session from '../../services/session';
import GordonActivityGrid from './components/ActivityGrid';
import GordonLoader from '../../components/Loader';
import Typography from '@material-ui/core/Typography';
import user from './../../services/user';
import { gordonColors } from '../../theme';
import Card from '@material-ui/core/Card';
import { isAuthenticated } from '../../services/auth';

export default class GordonActivitiesAll extends Component {
  constructor(props) {
    super(props);
    this.changeSession = this.changeSession.bind(this);
    this.filter = this.filter.bind(this);

    this.state = {
      currentSession: '',
      profile: '',
      activities: [],
      allActivities: [],
      myInvolvements: [],
      error: null,
      loading: true,
      search: '',
      session: '',
      sessions: [],
      type: '',
      types: [],
      network: 'online',
    };
  }

  async componentDidUpdate() {
    window.onpopstate = e => {
      window.location.reload();
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    if (this.props.Authentication) {
    try {
      const profile = await user.getProfileInfo();
      const { SessionCode: sessionCode } = await session.getCurrent();
      this.setState({ session: sessionCode, currentSession: sessionCode });
      if (window.location.href.includes('?')) {
        const tempSession = window.location.href.split('?')[1];
        this.setState({ session: tempSession, currentSession: tempSession });
      }
      const [activities, types, sessions] = await Promise.all([
        activity.getAll(this.state.session),
        activity.getTypes(this.state.session),
        session.getAll(),
      ]);
      const myInvolvements = await user.getCurrentMembershipsWithoutGuests(profile.ID);

      this.setState({
        profile,
        activities,
        allActivities: activities,
        myInvolvements: myInvolvements,
        sessions,
        types,
      });

      if (activities.length === 0) {
        var recentSession;
        recentSession = this.state.sessions[0].SessionCode;
        this.setState({ session: recentSession, currentSession: sessionCode });
        const [activities, types, sessions] = await Promise.all([
          activity.getAll(recentSession),
          activity.getTypes(recentSession),
          session.getAll(),
        ]);
        const myInvolvements = await user.getCurrentMembershipsWithoutGuests(profile.ID);

        this.setState({
          profile,
          activities,
          allActivities: activities,
          myInvolvements: myInvolvements,
          loading: false,
          sessions,
          types,
        });
      } catch (error) {
        this.setState({ error });
      }
    } else {
      try {
        const { SessionCode: sessionCode } = await session.getCurrent();
        this.setState({ session: sessionCode, currentSession: sessionCode });

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
  }

  async changeSession(event) {
    await this.setState({ session: event.target.value, loading: true });
    if (this.props.Authentication) {
      this.props.history.push(`?${this.state.session}`);
      const allActivities = await activity.getAll(this.state.session);
      const myInvolvements = await user.getSessionMembershipsWithoutGuests(
        this.state.profile.ID,
        this.state.session,
      );
      const { type, search } = this.state;
      await this.setState({
        activities: activity.filter(allActivities, type, search),
        allActivities,
        myInvolvements,
        loading: false,
      });
    } else {
      this.props.history.push(`?${this.state.session}`);
      const allActivities = await activity.getAll(this.state.session);
      const { type, search } = this.state;
      await this.setState({
        activities: activity.filter(allActivities, type, search),
        allActivities,
        loading: false,
      });
    }
  }

  filter(name) {
    return async event => {
      await this.setState({ [name]: event.target.value });
      const { allActivities, type, search } = this.state;
      await this.setState({ activities: activity.filter(allActivities, type, search) });
    };
  }
  render() {
    let content;

    if (this.state.error) {
      throw this.state.error;
    }

    let allInvolvements;
    let myInvolvements;
    let involvementsHeading;
    let noInvolvementsText;
    if (this.props.Authentication) {
      if (this.state.session === this.state.currentSession) {
        involvementsHeading = 'CURRENT';
        noInvolvementsText =
          "It looks like you're not currently a member of any Involvements. Get connected below!";
      } else {
        for (var i = 0; i < this.state.sessions.length; i++) {
          if (this.state.session === this.state.sessions[i].SessionCode) {
            involvementsHeading = this.state.sessions[i].SessionDescription.toString();
          }
        }
        noInvolvementsText = 'No Involvements found for ' + involvementsHeading;
        involvementsHeading = involvementsHeading.toUpperCase();
      }

      if (this.state.loading === true) {
        allInvolvements = <GordonLoader />;
        myInvolvements = <GordonLoader />;
      } else {
        allInvolvements = (
          <GordonActivityGrid activities={this.state.activities} sessionCode={this.state.session} />
        );
        myInvolvements = (
          <GordonActivityGrid
            myInvolvements={this.state.myInvolvements}
            sessionCode={this.state.session}
            noInvolvementsText={noInvolvementsText}
          />
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
      
      const headerStyle = {
        backgroundColor: gordonColors.primary.blue,
        color: '#FFF',
        padding: '10px',
      };
      
      /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
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

    // Creates the session list depending on the status of the network found in local storage
    let sessionList;
    if (networkStatus === 'online') {
      sessionList = sessionOptions;
    } else {
      sessionList = sessionOptions[0];
    }
      content = (
        <section className="activities-all">
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12} md={12} lg={8}>
              <Grid container className="activities-filter" spacing={16}>
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
                <Grid item xs={12} md={6} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="activity-session">Session</InputLabel>
                    <Select
                      value={this.state.session}
                      onChange={this.changeSession}
                      input={<Input id="activity-session" />}
                    >
                      {sessionList}
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
              </Grid>
            </Grid>
          </Grid>

          <Grid container align="center" spacing={32} justify="center">
            <Grid item xs={12} lg={8} fullWidth>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    MY {involvementsHeading} INVOLVEMENTS
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} lg={8}>
              {myInvolvements}
            </Grid>

            <Grid item xs={12} lg={8}>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    ALL INVOLVEMENTS
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} lg={8}>
              {allInvolvements}
            </Grid>
          </Grid>
        </section>
      );
    } else {
      if (this.state.loading === true) {
        allInvolvements = <GordonLoader />;
      } else {
        allInvolvements = (
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

      const headerStyle = {
        backgroundColor: gordonColors.primary.blue,
        color: '#FFF',
        padding: '10px',
      };

      content = (
        <section className="activities-all">
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12} md={12} lg={8}>
              <Grid container className="activities-filter" spacing={16}>
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
              </Grid>
            </Grid>
          </Grid>

          <Grid container align="center" spacing={32} justify="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    ALL ACTIVITIES
                  </Typography>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} lg={8}>
              {allInvolvements}
            </Grid>
          </Grid>
        </section>
      );
    }
    return <div>{content}</div>;
  }
}
