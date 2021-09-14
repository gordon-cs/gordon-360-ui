//import Grid from '@material-ui/core/Grid';
//import Divider from '@material-ui/core/Divider';
import { Component } from 'react';
//import List from '@material-ui/core/List';
//import Typography from '@material-ui/core/Typography';
import styles from './CoCurricularTranscriptExperience.module.css';

//This component is a child of the CoCurricularTranscript component.
//Returns a formatted Experience item to be displayed by the Transcript component
//Experience pobject passed as prop from CoCurricularTranscript

export default class Experience extends Component {
  /* Returns the first three letters of the month based on the number in the date */
  sliceMonth = (date) => {
    switch (date) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
  };

  //Formats the duration of the employment to be more legible on the resume
  formatDuration = (experience) => {
    if (experience.Job_Start_Date === null) {
      return null;
    } else {
      let Duration;

      let startMonth = this.sliceMonth(experience.Job_Start_Date.split('-')[1]);
      let startYear = ' ' + experience.Job_Start_Date.split('-')[0];
      let endTime = experience.Job_End_Date;

      if (endTime === null) {
        Duration = startMonth + startYear + '- Present';
      } else {
        let endMonth = this.sliceMonth(experience.Job_End_Date.split('-')[1]);
        let endYear = ' ' + experience.Job_End_Date.split('-')[0];
        if (endYear === startYear) {
          Duration = startMonth + '-' + endMonth + endYear;
        } else {
          Duration = startMonth + startYear + '-' + endMonth + endYear;
        }
      }
      return Duration;
    }
  };

  //Builds the Experience item to be returned to the Transcript component
  getContent = () => {
    const { Experience } = this.props;

    let Duration;
    Duration = this.formatDuration(Experience);

    let content = (
      <div className={styles.experience_transcript_activities}>
        <div className={styles.organization_role}>
          {Experience.Job_Department_Name}, {Experience.Job_Title}
        </div>
        <div className={styles.date}> {Duration} </div>
      </div>
    );
    return content;
  };

  render() {
    return this.getContent();
  }
}
