import React, { Component } from 'react';
import styles from './CoCurricularTranscriptActivity.module.css';

export default class Activity extends Component {
  // Helper functions for parsing and translating sessionCode which is of the format "YYYYSE"
  // where SE is 09 for fall, 01 for spring, 05 for summer

  // Returns: string of year in format YYYY
  sliceYear = (sesCode) => {
    return sesCode.slice(0, 4);
  };

  // Returns: string of month (Mon), month being the first month of the given semester
  sliceStart = (sesCode) => {
    switch (sesCode.slice(4, 6)) {
      case '09':
        return 'Sep';
      case '01':
        return 'Jan';
      case '05':
        return 'May';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
  };

  // Returns: string of month (Mon), month being last month of the given semester
  sliceEnd = (sesCode) => {
    switch (sesCode.slice(4, 6)) {
      case '09':
        return 'Dec';
      case '01':
        return 'May';
      case '05':
        return 'Sep';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
  };

  // Param: expects an array of [month in which the earlier session ended,
  //                             year in which the ealier session ended,
  //                             month in which the later session started (format: Mon),
  //                             year in which the later session started (YYYY)]
  // Returns: true if given month-year pairs are consecutive, false otherwise. Summers are not
  //        considered a break consecutiveness because there are no summer activities. */
  checkConsecutiveness = (dates) => {
    return (
      dates[1] === dates[3] ||
      (parseInt(dates[1], 10) + 1 === parseInt(dates[3], 10) &&
        dates[0] === 'Dec' &&
        dates[2] === 'Jan')
    );
  };

  // Prepares a list of sessions to be displayed as one coherent string representing the timepsan
  // of the membership.

  // Param: sessionsList - a list of sessionCodes
  // Returns: A string representing the duration of the user's membership based on the sessionsList
  formatDuration = (sessionsList) => {
    let duration = '';
    sessionsList.sort(function (sessA, sessB) {
      return sessA - sessB;
    });

    // format sessions into a string representing the timespan(s) of the membership
    //while (sessionsList.length > 0) {
    let curSess = sessionsList.shift();

    // Pop first session code from array and split into months and years, which are saved as
    // the initial start and end dates
    let startMon = this.sliceStart(curSess);
    let endMon = this.sliceEnd(curSess);
    let startYear = this.sliceYear(curSess),
      endYear = startYear;

    // For each other session, if it is consecutive to the current end date,
    // save its end date as the new end date, otherwise, add the current start and end dates to
    // the string 'duration' (because the streak is broken) and prepare to start a new streak.
    // Loop assumes sessions will be sorted from earliest to latest
    while (sessionsList.length > 0) {
      let curSess = sessionsList.shift();
      let nextStartMon = this.sliceStart(curSess);
      let nextYear = this.sliceYear(curSess);
      if (this.checkConsecutiveness([endMon, endYear, nextStartMon, nextYear])) {
        // a streak of consecutive involvement continues
        endMon = this.sliceEnd(curSess);
        endYear = this.sliceYear(curSess);
      } else {
        // a streak has been broken; add its start and end to the string and start new streak

        // don't show the year twice if the months are of the same year
        if (startYear === endYear) {
          duration += startMon;
        } else {
          duration += startMon + ' ' + startYear;
        }
        duration += '-' + endMon + ' ' + endYear + ', ';
        startMon = this.sliceStart(curSess);
        endMon = this.sliceEnd(curSess);
        startYear = endYear = this.sliceYear(curSess);
      }
    }

    // Flush the remaining start and end info to duration.
    // Again, don't show the year twice if the months are of the same year
    if (startYear === endYear) {
      duration += startMon;
    } else {
      duration += startMon + ' ' + startYear;
    }
    duration += '-' + endMon + ' ' + endYear;

    return duration;
  };

  render() {
    const { Activity, Sessions, LeaderSessions } = this.props;
    let duration = this.formatDuration(Sessions);
    let leaderDuration;
    if (LeaderSessions.length > 0) {
      leaderDuration = this.formatDuration(LeaderSessions);
    }

    return (
      <div className="experience-transcript-activities">
        <div className="organization-role">{Activity.ActivityDescription}</div>
        <div className="date"> {duration} </div>
        {!(leaderDuration === undefined) && (
          <div className="leadership-line">
            <div className="organization-role">Leader</div>
            <div className="date">{leaderDuration}</div>
          </div>
        )}
      </div>
    );
  }
}
