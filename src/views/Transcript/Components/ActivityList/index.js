import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { GridList, Subheader } from 'material-ui';
import session from '../../../../services/session';
import Typography from 'material-ui/Typography';

export default class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = { prevSession: '' };
  }

  componentWillMount() {
    //this.savePrevSession();
  }

  savePrevSession() {
    const { Activity } = this.props;
    this.setState({ prevSession: Activity.SessionDescription });
  }

  getContent = () => {
    const { Activity } = this.props;

    let content = (
      <Grid container>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <Typography> {Activity.ActivityDescription} </Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <Typography> {Activity.ParticipationDescription} </Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
    );

    return content;
  };

  getHeading = () => {
    const { Activity } = this.props;
    let heading = (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography type="title">
              {' '}
              <b> {Activity.SessionDescription} </b>{' '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                {' '}
                <b> Activity </b>{' '}
              </ListItem>
            </List>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                {' '}
                <b> Participation </b>{' '}
              </ListItem>
            </List>
            <Divider />
          </Grid>
        </Grid>
        <Grid />
      </div>
    );

    return heading;
  };

  createTable = () => {
    const { Activity } = this.props;
    const currSession = Activity.SessionDescription.toString();

    if (this.state.prevSession != Activity.SessionDescription) {
      let table = (
        <div>
          <Grid container>
            <Grid item>
              {this.getHeading()}
              {this.getContent()}
            </Grid>
          </Grid>
        </div>
      );
      this.savePrevSession();

      return table;
    } else {
      let table = (
        <div>
          <Grid container>
            <Grid item>{this.getContent()}</Grid>
          </Grid>
        </div>
      );
      this.savePrevSession();
      return table;
    }
  };

  render() {
    return (
      <div>
        {this.getHeading()}
        {this.getContent()}
      </div>
    );
  }
}

Activities.propTypes = {
  Activity: PropTypes.shape({
    SessionDescription: PropTypes.string.isRequired,
    ParticipationDescription: PropTypes.string.isRequired,
    PreviousSession: PropTypes.string.isRequired,
  }).isRequired,
};
