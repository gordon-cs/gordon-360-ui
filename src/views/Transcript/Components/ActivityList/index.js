import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import './activityList.css';

export default class Activities extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //this.savePrevSession();
  }

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

  createTable = () => {
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

    return table;
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

// Activities.propTypes = {
//   Activity: PropTypes.shape({
//     SessionDescription: PropTypes.string.isRequired,
//     ParticipationDescription: PropTypes.string.isRequired,
//   }).isRequired,
//   isUnique: PropTypes.bool.isRequired,
// };
