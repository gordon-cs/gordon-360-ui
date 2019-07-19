import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './activity-grid.css';

let network = 'online';

const gridListCols = width => {
  switch (width) {
    default:
      return 2;
    case 'xs':
      return 2;
    case 'sm':
      return 3;
    case 'md':
      return 5;
    case 'lg':
      return 5;
    // case '1680':
    //   return 5;
    case 'xl':
      return 6;
  }
};

class GordonActivityGrid extends Component {
  render() {
    /* Used to re-render the page when the network connection changes.
    *  this.state.network is compared to the message received to prevent
    *  multiple re-renders that creates extreme performance lost.
    *  The origin of the message is checked to prevent cross-site scripting attacks
    */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        network = 'online';
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        network = 'offline';
      }
    });

    /* Gets status of current network connection for online/offline rendering
    *  Defaults to online in case of PWA not being possible
    */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    let Content;

    if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length === 0) {
      Content = (
        <Grid item xs={12}>
          <Typography variant="headline" align="center">
            {this.props.noInvolvementsText}
          </Typography>
        </Grid>
      );
    } else if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length > 0) {
      // Creates the My Involvements cards depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        Content = this.props.myInvolvements.map(activity => (
          <div className="container">
            <Link
              to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
              className="item"
            >
              <div>
                <img
                  className="picture"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="item-title">{activity.ActivityDescription}</div>
              </div>
            </Link>
          </div>
        ));
      } else {
        Content = this.props.myInvolvements.map(activity => (
          <div className="container">
            <Card>
              <CardContent>
                <div>
                  <img
                    className="picture"
                    src={activity.ActivityImagePath}
                    alt={activity.ActivityDescription}
                    height="150"
                    width="150"
                  />
                  <div className="item-title">{activity.ActivityDescription}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        ));
      }
    }

    if (Array.isArray(this.props.activities) && this.props.activities.length === 0) {
      Content = (
        <Grid item xs={12}>
          <Typography variant="headline" align="center">
            No results for the selected session and type.
          </Typography>
        </Grid>
      );
    } else if (Array.isArray(this.props.activities) && this.props.activities.length > 0) {
      // Creates the Involvements cards depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        Content = this.props.activities.map(activity => (
          <div className="container">
            <Link
              to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
              className="item"
            >
              <div>
                <img
                  className="picture"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="item-title">{activity.ActivityDescription}</div>
              </div>
            </Link>
          </div>
        ));
      } else {
        Content = this.props.activities.map(activity => (
          <div className="container">
            <Card>
              <CardContent>
                <img
                  className="picture"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="item-title">{activity.ActivityDescription}</div>
              </CardContent>
            </Card>
          </div>
        ));
      }
    }

    return (
      <GridList
        cellHeight={250}
        spacing="16"
        cols={gridListCols(this.props.width)}
        className="gordon-activity-grid"
      >
        {Content}
      </GridList>
    );
  }
}

GordonActivityGrid.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      ActivityCode: PropTypes.string,
      ActivityDescription: PropTypes.string,
      ActivityImagePath: PropTypes.string,
      ActivityType: PropTypes.string,
    }),
  ).isRequired,
  sessionCode: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(GordonActivityGrid);
