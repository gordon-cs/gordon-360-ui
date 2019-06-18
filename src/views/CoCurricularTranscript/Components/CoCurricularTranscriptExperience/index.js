//import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
//import List from '@material-ui/core/List';
//import Typography from '@material-ui/core/Typography';
import './coCurricularTranscriptExperience.css';

//This component is a child of the CoCurricularTranscript component. Separates Headings from content in order
//that activities be grouped by session. Returns a formatted table grid of activites to be displayed
//by the Transcript component
//TrancsriptItem object and isUnique bool passed as props from CoCurricularTranscript

export default class Experience extends Component {
  /*getHeading = () => {
    const { TrancsriptItem } = this.props;
    let heading = (
      <div>
        <Grid container className="heading">
          <Grid item xs={12}>
            <Typography variant="title">
              <b> {TrancsriptItem.SessionDescription} </b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <List>
              <b> TrancsriptItem </b>
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
    const { TrancsriptItem } = this.props;

    let content = (
      <Grid container>
        <Grid item xs={6}>
          <List>
            <Typography className="text"> {TrancsriptItem.TrancsriptItemDescription} </Typography>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <Typography className="text"> {TrancsriptItem.ParticipationDescription} </Typography>
          </List>
        </Grid>
      )
    return content;
};*/

  render() {
    const { Experience } = this.props;
    return (
      <div>
        <div className="activities">
          <div className="organization-role">
            {Experience.Job_Department_Name}, {Experience.Job_Title}{' '}
          </div>
          {/* <div className="date"> {this.props.Duration} </div>*/}
        </div>

        <div className="divider">
          <Divider light={true} />
        </div>
      </div>
    );
  }
}
