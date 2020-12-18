import { GridList, GridListTile, Paper, Typography, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './activity-grid.css';
import '../../../../app.css';
import { useNetworkIsOnline } from '../../../../context/NetworkContext';

const gridListCols = (width) => {
  switch (width) {
    case 'xs':
      return 2;
    case 'sm':
      return 3;
    case 'md':
      return 5;
    case 'lg':
      return 5;
    case 'xl':
      return 6;
    default:
      return 2;
  }
};

const gridListCellHeight = (width) => {
  switch (width) {
    case 'xs':
      return 100;
    default:
      return 250;
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

const GordonActivityGrid = ({ activities, sessionCode, width, noInvolvementsText }) => {
  const isOnline = useNetworkIsOnline();

  let content;

  if (activities.length === 0) {
    content = (
      <GridListTile cols={gridListCols(width)} rows="auto">
        <Typography variant="h5" align="center">
          {noInvolvementsText}
        </Typography>
      </GridListTile>
    );
  } else {
    content = activities.map((activity) => {
      let activityImage = (
        <>
          <img
            className="gc360-act-grid_img"
            src={activity.ActivityImagePath}
            alt={activity.ActivityDescription}
            height="150"
            width="150"
            style={isOnline ? null : offlineStyle.image}
          />
          <div className="gc360-act-grid_title" style={isOnline ? null : offlineStyle.text}>
            {activity.ActivityDescription}
          </div>{' '}
        </>
      );

      return (
        <GridListTile key={activity.ActivityCode} className="gc360-act-grid_container">
          <Paper className="gc360-act-grid_paper" elevation={0}>
            {isOnline ? (
              <Link
                className="gc360-act-grid_link gc360-link"
                to={`/activity/${sessionCode}/${activity.ActivityCode}`}
              >
                {activityImage}
              </Link>
            ) : (
              activityImage
            )}
          </Paper>
        </GridListTile>
      );
    });
  }

  return (
    <GridList cellHeight={gridListCellHeight(width)} spacing={10} cols={gridListCols(width)}>
      {content}
    </GridList>
  );
};

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
