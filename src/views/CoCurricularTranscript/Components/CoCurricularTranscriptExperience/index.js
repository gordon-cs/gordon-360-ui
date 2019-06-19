//import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
//import List from '@material-ui/core/List';
//import Typography from '@material-ui/core/Typography';
import './coCurricularTranscriptExperience.css';

//This component is a child of the CoCurricularTranscript component.
//Returns a formatted Experience item to be displayed by the Transcript component
//Experience pobject passed as prop from CoCurricularTranscript

export default class Experience extends Component {
  //Formats the duration of the employment to be more legible on the resume
  formatDuration = Experience => {
    let Duration;

    let startTime = Experience.Job_Start_Date.substr(0, 7);

    let endTime;

    if (Experience.Job_End_Date === null) {
      endTime = 'Present';
    } else {
      endTime = Experience.Job_End_Date.substr(0, 7);
    }

    Duration = startTime + ' to ' + endTime;

    return Duration;
  };

  //Builds the Experience item to be returned to the Transcript component
  getContent = () => {
    const { Experience } = this.props;

    let Duration;
    Duration = this.formatDuration(Experience);

    let content = (
      <div>
        <div className="activities">
          <div className="organization-role">
            {Experience.Job_Department_Name}, {Experience.Job_Title}
          </div>
          <div className="date"> {Duration} </div>
        </div>

        <div className="divider">
          <Divider light={true} />
        </div>
      </div>
    );
    return content;
  };

  render() {
    return this.getContent();
  }
}
