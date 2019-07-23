import React, { Component, Fragment } from 'react';
import Moment from 'moment';

import Calendar from 'react-big-calendar/dist/react-big-calendar';
import MomentLocalizer from 'react-big-calendar/lib/localizers/moment';

import GordonLoader from '../../../../components/Loader';
import schedule from './../../../../services/schedule';
import myschedule from './../../../../services/myschedule';

import './courseschedule.css';

export default class CourseSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      officeHoursOpen: false,
      disabled: true,
      selectedEvent: null,
      isDoubleClick: false,
    };
    this.eventInfo = [];
  }

  customEventPropGetter = (event, start, end, isSelected) => {
    if (event.id > 1000) {
      return {
        className: 'custom-event',
        style: {
          backgroundColor: isSelected ? '#8d4987' : '#9b5094',
        },
      };
    } else return {};
  };


  componentWillReceiveProps(nextProps){
    if (this.props.reloadCall !== nextProps.reloadCall){
      this.loadData(this.props.profile);
      this.props.reloadHandler();
    }
  }



  componentWillMount() {
    this.loadData(this.props.profile);
  }

  loadData = async searchedUser => {
    let courseInfo = null;
    if (this.props.myProf) {
      const schedulePromise = schedule.getScheduleMyProf();
      courseInfo = await schedule.makeScheduleCourses(schedulePromise);
    } else {
      try {
        const schedulePromise = schedule.getSchedule(searchedUser.AD_Username);
        courseInfo = await schedule.makeScheduleCourses(schedulePromise);
      } catch (e) {
        this.setState({ loading: false });
      }
    }
    const myschedulePromise = myschedule.getMySchedule(searchedUser.AD_Username);
    let myscheduleInfo = await myschedule.makeMySchedule(myschedulePromise);

    if (courseInfo) {
      this.eventInfo = courseInfo.concat(myscheduleInfo);
    } else {
      this.eventInfo = myscheduleInfo;
    }

    this.setState({ loading: false });
  };

  render() {
    const resourceMap = [
      { resourceId: 1, resourceTitle: 'Sunday' },
      { resourceId: 2, resourceTitle: 'Monday' },
      { resourceId: 3, resourceTitle: 'Tuesday' },
      { resourceId: 4, resourceTitle: 'Wednesday' },
      { resourceId: 5, resourceTitle: 'Thursday' },
      { resourceId: 6, resourceTitle: 'Friday' },
      { resourceId: 7, resourceTitle: 'Saturday' },
    ];

    // Localizer is always required for react-big-calendar initialization
    let formats = {
      dayHeaderFormat: (date, localizer = MomentLocalizer(Moment)) =>
        localizer.format(date, 'MMMM YYYY'), // [] makes string to escape from parser (use this for session display)
    };

    const dayStart = new Date();
    dayStart.setHours(6, 0, 0, 0);

    const dayEnd = new Date();
    dayEnd.setHours(22, 0, 0, 0);

    let content;
    if (this.state.loading) {
      content = <GordonLoader />;
    } else {
      // Calendar API can be controlled here with these properties
      let Resource = ({ localizer = MomentLocalizer(Moment) }) => (
        <Calendar
          selectable
          events={this.eventInfo}
          localizer={localizer}
          min={dayStart}
          max={dayEnd}
          step={15}
          timeslots={4}
          defaultView="day"
          view={['day']}
          onSelectEvent={event => {
            this.props.handleRemoveButton(event);
          }}
          onDoubleClickEvent={event => {
            this.props.handleDoubleClick(event);
          }}
          onSelectSlot={slotInfo => {this.props.handleOfficeHoursOpen(slotInfo)}}
          defaultDate={Moment(new Date())}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          eventPropGetter={this.customEventPropGetter}
          formats={formats}
        />
      );
      content = Resource(MomentLocalizer(Moment));
    }

    return <Fragment>{content}</Fragment>;
  }
}
