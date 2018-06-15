import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import './transcriptActivity.css';

//This components is a child of the Transcript component. Seperates Headings from content in order
//that activities be grouped by session. Returns a formatted table grid of activites to be displayed
//by the Transcript component
//Activity object and isUnique bool passed as props from Transcript

export default class Activity extends Component {
  getHeading = () => {
    const { Activity } = this.props;
    let heading = (
      <div>
        <Grid container className="heading">
          <Grid item xs={12}>
            <Typography type="title">
              <b> {Activity.SessionDescription} </b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <List>
              <b> Activity </b>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <b> Participation </b>
            </List>
          </Grid>
        </Grid>
        <div className="divider">
          <Divider />
        </div>
        <Grid />
      </div>
    );
    if (!this.props.isUnique) {
      return (
        <div className="divider">
          <Divider light={true} />
        </div>
      );
    }
    return heading;
  };

  getContent = () => {
    const { Activity } = this.props;

    let content = (
      <Grid container>
        <Grid item xs={6}>
          <List>
            <Typography className="text"> {Activity.ActivityDescription} </Typography>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <Typography className="text"> {Activity.ParticipationDescription} </Typography>
          </List>
        </Grid>
      </Grid>
    );

    return content;
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
