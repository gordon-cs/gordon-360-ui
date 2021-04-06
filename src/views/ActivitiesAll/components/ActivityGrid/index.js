import { GridList, GridListTile, Paper, Typography, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import storage from 'services/storage';

import './activity-grid.css';

const gridListCols = (width) => {
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

const gridListCellHeight = (width) => {
  switch (width) {
    default:
      return 250;
    case 'xs':
      return 100;
  }
};

const offlineStyle = {
  image: {
    margin: '1rem auto 0.2rem auto',
  },
  text: {
    margin: '1rem auto',
  },
};

class GordonActivityGrid extends Component {
  constructor() {
    super();
    this.state = {
      network: 'online',
    };
  }
  componentDidMount() {
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
        this.setState({ network: 'offline', linkopen: false });
      }
    });

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }

    // Saves the network's status to this component's state
    this.setState({ network });
  }

  render() {
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
      // Creates the My Involvements cards
      content = this.props.myInvolvements.map((activity) => (
        <GridListTile className="gc360-act-grid_container" rows="1">
          <Paper className="gc360-act-grid_paper" elevation={0}>
            <Link
              className="gc360-act-grid_link gc360-link"
              to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
            >
              <img
                className="gc360-act-grid_img"
                src={activity.ActivityImagePath}
                alt={activity.ActivityDescription}
                height="150"
                width="150"
              />
              <div className="gc360-act-grid_title">{activity.ActivityDescription}</div>
            </Link>
          </Paper>
        </GridListTile>
      ));
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
      // Creates the Involvements cards
      content = this.props.activities.map((activity) => (
        <GridListTile className="gc360-act-grid_container">
          <Paper className="gc360-act-grid_paper" elevation={0}>
            {this.state.network === 'online' ? (
              <Link
                className="gc360-act-grid_link gc360-link"
                to={`/activity/${this.props.sessionCode}/${activity.ActivityCode}`}
              >
                <img
                  className="gc360-act-grid_img"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                />
                <div className="gc360-act-grid_title">{activity.ActivityDescription}</div>
              </Link>
            ) : (
              <div>
                <img
                  className="gc360-act-grid_img"
                  src={activity.ActivityImagePath}
                  alt={activity.ActivityDescription}
                  height="150"
                  width="150"
                  style={offlineStyle.image}
                />
                <div className="gc360-act-grid_title" style={offlineStyle.text}>
                  {activity.ActivityDescription}
                </div>
              </div>
            )}
          </Paper>
        </GridListTile>
      ));
    }

    return (
      <GridList
        cellHeight={gridListCellHeight(this.props.width)}
        spacing={10}
        cols={gridListCols(this.props.width)}
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
