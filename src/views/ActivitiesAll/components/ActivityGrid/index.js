import Grid from 'material-ui/Grid';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './activity-grid.css';

const gridListCols = width => {
  switch (width) {
    default:
      return 2;
    case 'sm':
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
      <Grid item>
        <Typography type="display1">No Activities Found</Typography>
      </Grid>
    );

    if (Array.isArray(this.props.activities) && this.props.activities.length > 0) {
      content = this.props.activities.map(activity => (
        <GridListTile key={activity.ActivityCode} className="activity">
          <Link to={`/activities/${this.props.sessionCode}/${activity.ActivityCode}`}>
            <img src={activity.ActivityImagePath} alt={activity.ActivityDescription} />

            <GridListTileBar
              className="tile-bar"
              classes={{
                title: 'title',
              }}
              title={activity.ActivityDescription}
            />
          </Link>
        </GridListTile>
      ));
    }

    return (
      <GridList
        cellHeight={200}
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
