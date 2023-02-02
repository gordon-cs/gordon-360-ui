import { Grid, AppBar, Breadcrumbs } from '@mui/material';
//   import { useState, useEffect } from 'react';
//   import { useParams } from 'react-router';
import styles from './Header.module.css';
// import { useUser } from 'hooks';
//   import { getTeamByID } from 'services/recim/team';
//   import { getParticipantByUsername } from 'services/recim/participant';
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  return (
    <>
      <Grid className={styles.mainHeader}></Grid>
      {/* <Grid className={styles.stickyNav}>Testing / the / header / nav</Grid> */}
      <AppBar position="sticky" className={styles.stickyNav}>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter className="gc360_text_link" underline="hover" color="inherit" to={'/recim'}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Rec-IM Home
          </LinkRouter>
          {/* <Typography color="text.primary">{activity.Name}</Typography> */}
        </Breadcrumbs>
      </AppBar>
    </>
  );
};

export default Header;
