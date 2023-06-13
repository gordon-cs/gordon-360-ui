// @TODO CSSMODULES - moved to global styles until a better solution is found
// import styles from './Home.module.css';
import {
  Grid,
  CardHeader,
  Divider,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import wellness from 'services/wellness';
import styles from './ExtraLinks.module.css';

import { forwardRef } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const ForwardNavLink = forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    if (profile) {
      setLoading(true);
      wellness.getStatus().then(({ IsValid }) => {
        setLoading(false);
      });
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setLoading(false);
    }
  }, [profile]);

  if (loading || loadingProfile) {
    return <GordonLoader />;
  } else {
    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={5} className={styles.memberships}>
            <Grid container className={styles.memberships_header}>
              <CardHeader title="Academics" />
            </Grid>
            <Card className={styles.memberships_card}>
              <CardContent className={styles.memberships_card_content}>
                <List sx={12} component="nav" aria-label="academic">
                  <ListItem button component="a" href="https://www.gordon.edu/">
                    <ListItemText primary="Gordon College" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider component="a" href="https://my.gordon.edu/ics">
                    <ListItemText primary="My Gordon" />
                  </ListItem>
                  <ListItem button component="a" href="https://go.gordon.edu/">
                    <ListItemText primary="Go Gordon" />
                  </ListItem>
                  <Divider light />
                  <ListItem button component="a" href="https://gordon.instructure.com/">
                    <ListItemText primary="Canvas" />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5} className={styles.memberships}>
            <Grid container className={styles.memberships_header}>
              <CardHeader title="General Information" />
            </Grid>
            <Card className={styles.memberships_card}>
              <CardContent className={styles.memberships_card_content}>
                <List sx={12} component="nav" aria-label="general information">
                  <ListItem button component="a" href="https://athletics.gordon.edu/">
                    <ListItemText primary="Fighting Scots" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider component="a" href="https://stories.gordon.edu/">
                    <ListItemText primary="The Bell" />
                  </ListItem>
                  <ListItem button component="a" href="https://www.gordon.edu/titleix">
                    <ListItemText primary="Sexual Discrimination and Harassment" />
                  </ListItem>
                  <Divider light />
                  <ListItem button component="a" href="https://www.gordon.edu/map">
                    <ListItemText primary="Gordon College Maps" />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5} className={styles.memberships}>
            <Grid container className={styles.memberships_header}>
              <CardHeader title="Other" />
            </Grid>
            <Card className={styles.memberships_card}>
              <CardContent className={styles.memberships_card_content}>
                <List sx={12} component="nav" aria-label="other">
                  <ListItem button component="a" href="https://360.gordon.edu/id">
                    <ListItemText primary="Upload ID Photo" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider component="a" href="https://360.gordon.edu/apartapp">
                    <ListItemText primary="Apartment Application" />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="https://go.gordon.edu/departments/studentlife/mealplans/"
                  >
                    <ListItemText primary="Student Meal Plans" />
                  </ListItem>
                  <Divider light />
                  <ListItem button component="a" href="https://cts.gordon.edu/">
                    <ListItemText primary="Center for Technology Services (CTS)" />
                  </ListItem>
                  <Divider />
                  <ListItem button component={ForwardNavLink} to="/involvements">
                    <ListItemText primary="Involvements" />
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Home;
