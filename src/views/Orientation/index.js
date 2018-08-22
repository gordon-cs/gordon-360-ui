/*
 * Orientation Roadmap
 * Initially Written Fall of 2017 by Nicholas Miller and Anna Pelletier
 *
 * This file controls the Orientation Roadmap page. It uses data from the 360 API to generate
 * the page. It's split into two major parts- the data checks, and the page HTML.
 *
 */

import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import React, { Component } from 'react';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { LinearProgress } from 'material-ui/Progress';
import http from '../../services/http';
import user from '../../services/user.js';

import './orientation.css';

export default class Orientation extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    // Data Checks

    let idPhotoAvatar;
    let idPhotoSubheader;
    let idPhotoBody;
    let residenceSurveyAvatar;
    let residenceSurveySubheader;
    let residenceSurveyBody;
    let tasksComplete = 0;
    let tasksTotal = 2;
    if (tasksTotal < tasksComplete) tasksComplete = tasksTotal;

    // ID Photo uploaded
    if (http.get(`orientation/photo/${user.LocalInfo.user_name}`)) {
      idPhotoAvatar = 'green-avatar';
      idPhotoSubheader = 'Completed!';
      idPhotoBody = "We’ve received your ID photo." +
      " An ID/Access/Meal Plan card will be prepared for your arrival this semester." +
      " It will be available at Check In at your residence, or picked up at Gordon College Police.";
      tasksComplete ++
    } else { // ID Photo not uploaded
      idPhotoAvatar = 'red-avatar';
      idPhotoSubheader = 'Not received';
      idPhotoBody = "Email a square-format headshot photo of yourself to IDCard.CTS@gordon.edu." +
      " Your facial features should be clear and unobstructed." +
      " No hats, sunglasses, collections of friends, pets, or silly disguises."
    }

    // Housing Assignment made
    if (false) {
      residenceSurveyAvatar = 'green-avatar';
      residenceSurveySubheader = 'Completed!';
      residenceSurveyBody = "Your housing assignment has been made!"
      tasksComplete ++;
    } else if (false) { // Residence Survey completed, Housing Assignment not made
      residenceSurveyAvatar = 'yellow-avatar';
      residenceSurveySubheader = 'In Progress';
      residenceSurveyBody = "We’ve received your Housing Information Questionnaire," +
      " and the Housing Director will be working to accommodate your housing request." +
      " Assignments will be confirmed by Gordon email starting in mid-summer." +
      " Contact Housing@gordon.edu if you need to update your information, or if you have a question."
    } else { // Residence Survey not completed
      residenceSurveyAvatar = 'red-avatar';
      residenceSurveySubheader = 'Not received';
      residenceSurveyBody = "Complete the Housing Information Questionnaire." +
      " This provides information to the Housing Director about your on-campus housing," +
      " or your request to be a commuting student.";
    }

    // Page HTML

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Tasks Complete</h3>
              {tasksComplete} of {tasksTotal}
            </figcaption>
            <LinearProgress
              className="orientation-progress"
              mode="determinate"
              value={tasksComplete / tasksTotal * 100}
            />
          </figure>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={<Avatar className={idPhotoAvatar} />}
                title="ID Photo"
                subheader={idPhotoSubheader}
              />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {idPhotoBody}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={<Avatar className={residenceSurveyAvatar} />}
                title="Residence Survey"
                subheader={residenceSurveySubheader}
              />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
              {residenceSurveyBody}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
