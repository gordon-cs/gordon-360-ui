import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './activity-grid.css';

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
    let content;

    if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length === 0) {
      content = (
        <Grid item xs={12}>
          <Typography variant="headline" align="center">
            {this.props.noInvolvementsText}
          </Typography>
        </Grid>
      );
    } else if (Array.isArray(this.props.myInvolvements) && this.props.myInvolvements.length > 0) {
      content = this.props.myInvolvements.map(activity => (
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
    }

    if (Array.isArray(this.props.activities) && this.props.activities.length === 0) {
      content = (
        <Grid item xs={12}>
          <Typography variant="headline" align="center">
            No results for the selected session and type.
          </Typography>
        </Grid>
      );
    } else if (Array.isArray(this.props.activities) && this.props.activities.length > 0) {
      content = this.props.activities.map(activity => (
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
    }

    return (
      <GridList
        cellHeight={250}
        spacing="16"
        cols={gridListCols(this.props.width)}
        className="gordon-activity-grid"
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
