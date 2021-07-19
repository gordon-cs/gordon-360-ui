import React from 'react';
import { Divider, ListItem, Grid, Typography } from '@material-ui/core';
import './index.css';

const ProfileInfoListItem = ({ title, contentText, ContentIcon = null, contentClass = null }) => {
  const gridSizeProps = ContentIcon ? { xs: 4, md: 3, lg: 4 } : { xs: 7 };

  return (
    <>
      <ListItem className="profile-info-list-item">
        <Grid container alignItems="center">
          <Grid container item xs={5} alignItems="center">
            <Typography>{title}</Typography>
          </Grid>
          <Grid container item {...gridSizeProps} alignItems="center" className={contentClass}>
            {contentText}
          </Grid>
          {ContentIcon && (
            <Grid container item xs={3} md={4} lg={3} justifyContent="center">
              {ContentIcon}
            </Grid>
          )}
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProfileInfoListItem;
