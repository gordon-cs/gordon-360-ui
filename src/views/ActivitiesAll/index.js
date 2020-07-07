import {
  Card,
  CardContent,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import './activities-all.css';
import activity from '../../services/activity';
import session from '../../services/session';
import GordonActivityGrid from './components/ActivityGrid';
import GordonLoader from '../../components/Loader';
import user from './../../services/user';
import { gordonColors } from '../../theme';
import Requests from './components/Requests';

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
    window.onpopstate = (e) => {
      window.location.reload();
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { SessionCode: sessionCode } = await session.getCurrent();
    const [activities, types, sessions] = await Promise.all([
      activity.getAll(sessionCode),
      activity.getTypes(sessionCode),
      session.getAll(),
    ]);

    //Index of the array "activities" of current session
    var IcurrentSession;
    for (var i = 0; i < sessions.length; i++) {
      if (sessionCode === sessions[i].SessionCode) {
        IcurrentSession = i;
        break;
      }
    }

    let [pastActivities, pastTypes] = [[], []];
    let myPastInvolvements = [];
    let tempSession;
    var backButton = false;
    if (window.location.href.includes('?')) {
      backButton = true;
      tempSession = window.location.href.split('?')[1];
      this.setState({ session: tempSession, currentSession: tempSession });
      [pastActivities, pastTypes] = await Promise.all([
        activity.getAll(tempSession),
        activity.getTypes(tempSession),
      ]);
    }
    if (this.props.Authentication) {
      try {
        const profile = await user.getProfileInfo();
        const myInvolvements = await user.getSessionMembershipsWithoutGuests(
          profile.ID,
          sessionCode,
        );
        if (backButton) {
          myPastInvolvements = await user.getSessionMembershipsWithoutGuests(
            profile.ID,
            tempSession,
          );
          this.setState({
            profile,
            activities: pastActivities,
            allActivities: pastActivities,
            myInvolvements: myPastInvolvements,
            types: pastTypes,
            sessions: sessions,
          });
        } else if (activities.length === 0) {
          for (var k = IcurrentSession - 1; k >= 0; k--) {
            const [newActivities] = await Promise.all([activity.getAll(sessions[k].SessionCode)]);
            if (newActivities.length !== 0) {
              this.setState({
                session: sessions[k].SessionCode,
                sessions,
                activities: newActivities,
                allActivities: newActivities,
                myInvolvements: [],
                types,
                profile,
              });
              break;
            }
          }
        } else {
          this.setState({
            profile,
            session: sessionCode,
            activities,
            allActivities: activities,
            myInvolvements: myInvolvements,
            sessions,
            types,
          });
        }
      } catch (error) {
        this.setState({ error });
      }
    } else {
      try {
        if (backButton) {
          this.setState({
            activities: pastActivities,
            allActivities: pastActivities,
            types: pastTypes,
            sessions: sessions,
          });
        } else if (activities.length === 0) {
          for (k = IcurrentSession - 1; k >= 0; k--) {
            const [newActivities] = await Promise.all([activity.getAll(sessions[k].SessionCode)]);
            if (newActivities.length !== 0) {
              this.setState({
                session: sessions[k].SessionCode,
                sessions,
                activities: newActivities,
                allActivities: newActivities,
                types,
              });
              break;
            }
          }
        } else {
          this.setState({
            session: sessionCode,
            activities,
            allActivities: activities,
            sessions,
            types,
          });
        }
      } catch (error) {
        this.setState({ error });
      }
    }
    this.setState({ loading: false });
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
    return async (event) => {
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

      const typeOptions = this.state.types.map((type) => (
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
          <Grid container justify="center" spacing={0}>
            <Grid item xs={12} md={12} lg={8}>
              <Grid container className="activities-filter" spacing={2}>
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

          <Grid container align="center" spacing={4} justify="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <Grid item xs={12}>
                  <Requests />
                </Grid>
              </Card>
            </Grid>
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
      //if youre not authenticated
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

      const typeOptions = this.state.types.map((type) => (
        <MenuItem value={type} key={type}>
          {type}
        </MenuItem>
      ));

      const headerStyle = {
        backgroundColor: gordonColors.primary.blue,
        color: '#FFF',
        padding: '10px',
      };

      if (networkStatus === 'online') {
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
                  <Grid item xs={12} md={5}>
                    <Requests />
                  </Grid>
                </Card>
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
      }
      // If the network is offline
      else {
        // If the user is not authenitcated
        if (!this.props.Authentication) {
          content = (
            <Grid container justify="center" spacing="16">
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    <Grid
                      item
                      xs={2}
                      alignItems="center"
                      style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <img
                        src={require(`${'../../NoConnection.svg'}`)}
                        alt="Internet Connection Lost"
                      />
                    </Grid>
                    <br />
                    <h1>Please Re-establish Connection</h1>
                    <h4>Viewing Involvements has been deactivated due to loss of network.</h4>
                    <br />
                    <br />
                    <Button
                      color="primary"
                      backgroundColor="white"
                      variant="outlined"
                      onClick={() => {
                        window.location.pathname = '';
                      }}
                    >
                      Back To Home
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        }
      }
    }
    return <div>{content}</div>;
  }
}
