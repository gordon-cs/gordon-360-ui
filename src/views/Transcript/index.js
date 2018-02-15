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
    marginTop: 30,
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
      <Card className={classes.card}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Button variant="raised" color="primary" className={classes.button}>
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
          <Grid item xs={4}>
            <Card className={classes.card}>
              Activity
              <ListItem>
                <ListItemText primary="Sample Club" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sample Club 2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sample Club 3" />
              </ListItem>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              Participation
              <ListItem>
                <ListItemText primary="Member" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Leader" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Member" />
              </ListItem>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              Total Semesters
              <ListItem>
                <ListItemText primary="2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2" />
              </ListItem>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
