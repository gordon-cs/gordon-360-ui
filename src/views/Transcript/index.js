import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  card: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Button variant="raised" color="primary" fullWidth="true">
              Download Transcript
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>Experience Transcript</Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>Spring 17-18 Academic Year</Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText primary="Activity" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sample Club" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sample Club 2" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sample Club 3" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText primary="Member" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Leader" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Member" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText primary="Total Semesters" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="1" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
