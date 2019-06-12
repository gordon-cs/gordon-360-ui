import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { gordonColors } from '../../theme';
import session from '../../services/session';
import Activity from './Components/CoCurricularTranscriptActivity';
import user from './../../services/user';
import GordonLoader from './../../components/Loader';
import './coCurricularTranscript.css';

//This component creates the overall interface for the CoCurricularTranscript (card, heading,
//download button), and contains a InvolvementsList object for displaying the content

export default class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loading: true,
      profile: {},
    };
    //Variable used by groupActivityBySession to determine when activies in the list are part of a
    //new session necessary in order to remember session info about previous item in list while
    //looping though
    this.prevSessionVal = '';
  }

  handleDownload() {
    window.print(); //look for somethig that sends straight to download
  }

  componentWillMount() {
    this.loadTranscript();
  }

  async loadTranscript() {
    this.setState({ loading: true });
    try {
      const currentSession = await session.getCurrent();

      const profile = await user.getProfileInfo();
      //const employment = await user.getEmploymentInfo(profile.ID);  -- needs to be written
      //const service = await user.getServiceInfo(profile.ID);  -- needs to be written
      const activities = await user.getTranscriptInfo(profile.ID);
      this.setState({ loading: false, activities, currentSession, profile });
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  //Compares activity from activityList to previous activity' session to to determine how to group.
  //isUnique value is passed as a prop, along with Activity object, to TranscriptActivity Component
  //Returns TranscriptActivity component which should be passed into activityList
  groupActivityBySession = activity => {
    //bool to keep track of when an activity is part of a new session, passed to TranscriptActivity
    let isUniqueSession = true;

    if (activity.SessionDescription === this.prevSessionVal) {
      isUniqueSession = false;
    } else {
      isUniqueSession = true;
    }
    this.prevSessionVal = activity.SessionDescription;
    return <Activity isUnique={isUniqueSession} Activity={activity} />;
  };

  render() {
    let activityList;

    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(this.groupActivityBySession);
    }

    const buttonColors = {
      /* not in style sheet so that gordonColors is accessible */
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <div className="co-curricular-transcript">
        <Card className="transcript-item" elevation="10">
          <CardContent className="card-content">
            <div className="print-only">{/* <img src={require('./logo.png')} alt="" /> */}</div>
            <div>
              <Button
                className="button"
                onClick={this.handleDownload}
                raised
                style={buttonColors}
                variant="contained"
              >
                Print Co-Curricular Transcript
              </Button>
            </div>
            <div>
              <Typography variant="headline">
                <b> Co-Curricular Transcript - </b>
                {this.state.profile.fullName}
              </Typography>
            </div>
            <div>
              <Typography variant="headline">
                <b>
                  <i> Activities </i>
                </b>
              </Typography>
            </div>
            <div className="involvements" class="print">
              <div className="full-length">{activityList}</div>
            </div>
            <div>
              <Typography variant="headline">
                <b>
                  <i> Employment </i>
                </b>
              </Typography>
            </div>
            <div>
              <Typography variant="headline">
                <b>
                  <i> Service Learning </i>
                </b>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
