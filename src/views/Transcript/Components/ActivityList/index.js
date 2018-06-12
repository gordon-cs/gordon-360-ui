import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';

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
            <ListItem>
              <Typography> {Activity.ActivityDescription} </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <Typography> {Activity.ParticipationDescription} </Typography>
            </ListItem>
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
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                {' '}
                <b> Participation </b>{' '}
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid />
      </div>
    );
    if (!this.props.isUnique) {
      return '';
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
        <Divider />
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
