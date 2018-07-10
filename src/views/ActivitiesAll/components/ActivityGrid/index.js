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
      return 2;
    case 'md':
      return 3;
    case 'lg':
      return 4;
    case 'xl':
      return 5;
  }
};

class GordonActivityGrid extends Component {
  render() {
    let content = (
      <Grid item xs={12}>
        <Typography variant="headline" align="center">
          Sorry, for this specific session/Involvement type we couldn't find any results.
        </Typography>
      </Grid>
    );

    if (Array.isArray(this.props.activities) && this.props.activities.length > 0) {
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
      <Grid container justify="center" spacing="16">
        <Grid item xs={12} md={12} lg={8}>
          <GridList
            cellHeight={250}
            spacing="32"
            cols={gridListCols(this.props.width)}
            className="gordon-activity-grid"
          >
            {content}
          </GridList>
        </Grid>
      </Grid>
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
