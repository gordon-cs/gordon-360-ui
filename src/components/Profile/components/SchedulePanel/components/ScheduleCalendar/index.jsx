import React, { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService from 'services/schedule';
import session from 'services/session';
import './ScheduleCalendar.css';

const GordonScheduleCalendar = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [currentSession, setCurrentSession] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);

  const customEventPropGetter = (event, start, end, isSelected) => {
    if (event.id > 1000) {
      return {
        className: 'custom-event',
        style: {
          backgroundColor: isSelected ? '#8d4987' : '#9b5094',
        },
      };
    } else return {};
  };

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile]);

  const loadData = async (searchedUser) => {
    setLoading(true);
    let courseInfo = null;
    try {
      const schedule = await scheduleService.getSchedule(
        props.myProf ? '' : searchedUser.AD_Username,
        '202209',
      );
      courseInfo = scheduleService.makeScheduleCourses(schedule);
    } catch (e) {
      setLoading(false);
    }

    if (courseInfo) {
      setEventInfo(courseInfo);
    }

    let currentSession = await session.getCurrent();
    setCurrentSession(currentSession);
    setLoading(false);
  };

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
    dayHeaderFormat: (date, localizer = momentLocalizer(Moment)) =>
      localizer.format(date, '[' + currentSession.SessionDescription + ']'),
  };

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else {
    let Resource = ({ localizer = momentLocalizer(Moment) }) => (
      <Calendar
        selectable={props.isOnline}
        events={eventInfo}
        localizer={localizer}
        min={dayStart}
        max={dayEnd}
        step={15}
        timeslots={4}
        defaultView="day"
        view={['day']}
        onDoubleClickEvent={(event) => {
          props.handleDoubleClick(event);
        }}
        defaultDate={Moment(new Date())}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        eventPropGetter={customEventPropGetter}
        formats={formats}
      />
    );
    content = Resource(momentLocalizer(Moment));
  }

  return <Fragment>{content}</Fragment>;
};

export default GordonScheduleCalendar;
