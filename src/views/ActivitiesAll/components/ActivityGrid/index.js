import { GridList, GridListTile, Paper, Typography, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './activity-grid.css';
import '../../../../app.css';

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

const gridListCellHeight = width => {
  switch (width) {
    default:
      return 250;
    case 'xs':
      return 100;
    case 'sm':
      return 250;
    case 'md':
      return 250;
    case 'lg':
      return 250;
    case 'xl':
      return 250;
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

    let content;

    if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length === 0) {
      content = (
        <GridListTile cols={gridListCols(this.props.width)} rows="auto">
          <Typography variant="h5" align="center">
            {this.props.noInvolvementsText}
          </Typography>
        </GridListTile>
      );
    } else if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length > 0) {
      // Creates the My Involvements cards depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        content = this.props.myInvolvements.map(activity => (
          <GridListTile className="container" rows="1">
            <Paper className="paper" elevation={0}>
              <Link
                className="link"
                to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
              >
                <img
                  className="img-item"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="title-item">{activity.ActivityDescription}</div>
              </Link>
            </Paper>
          </GridListTile>
        ));
      } else {
        // exactly the same as content of 'if' block above besides disabled=...
        content = this.props.myInvolvements.map(activity => (
          <GridListTile className="container" rows="1">
            <Paper className="paper" elevation={0}>
              <Link
                className="link"
                to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
                disabled={networkStatus}
              >
                <img
                  className="img-item"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="title-item">{activity.ActivityDescription}</div>
              </Link>
            </Paper>
          </GridListTile>
        ));
      }
    }

    if (Array.isArray(this.props.activities) && this.props.activities.length === 0) {
      content = (
        <GridListTile cols={gridListCols(this.props.width)} rows="auto">
          <Typography variant="h5" align="center">
            No results for the selected session and type.
          </Typography>
        </GridListTile>
      );
    } else if (Array.isArray(this.props.activities) && this.props.activities.length > 0) {
      // Creates the Involvements cards depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        content = this.props.activities.map(activity => (
          <GridListTile className="container" rows="1">
            <Paper className="paper" elevation={0}>
              <Link
                className="link"
                to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
              >
                <img
                  className="img-item"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="title-item">{activity.ActivityDescription}</div>
              </Link>
            </Paper>
          </GridListTile>
        ));
      } else {
        // exactly the same as content of 'if' block above besides disabled=...
        content = this.props.activities.map(activity => (
          <GridListTile className="container" rows="1">
            <Paper className="paper" elevation={0}>
              <Link
                className="link"
                to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
                disabled={networkStatus}
              >
                <img
                  className="img-item"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="title-item">{activity.ActivityDescription}</div>
              </Link>
            </Paper>
          </GridListTile>
        ));
      }
    }

    return (
      <GridList
        cellHeight={gridListCellHeight(this.props.width)}
        spacing={10}
        cols={gridListCols(this.props.width)}
        className="gc360-activity-grid"
      >
        {content}
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
