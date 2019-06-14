import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CourseSchedule from './components/CourseSchedule';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

export default class GordonSchedulePanel extends Component {
  render() {
    let isFaculty = String(this.props.profile.PersonType).includes('fac');
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Show My Schedule</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} lg={12}>
            <Card>
              <CardContent>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs={8}>
                    <Grid container xs={12} justify="start">
                      <CardHeader title="Course Schedule" />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} align="right">
                    <Button
                      onClick={this.handleSocialLinksOpen}
                      disabled={isFaculty ? false : true}
                    >
                      EDIT OFFICE HOURS
                    </Button>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Grid container xs={12} lg={10}>
                      <Grid item xs={12}>
                        <CourseSchedule />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
