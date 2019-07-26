import { GridList, GridListTile, Paper, Typography, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './activity-grid.css';
import '../../../../app.css';

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
  }
};

class GordonActivityGrid extends Component {
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
      content = this.props.myInvolvements.map(activity => (
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
      content = this.props.activities.map(activity => (
        <GridListTile className="gc360-act-grid_container">
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
