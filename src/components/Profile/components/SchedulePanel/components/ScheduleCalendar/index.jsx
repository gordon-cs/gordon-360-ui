import React, { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService from 'services/schedule';
import session from 'services/session';
import './ScheduleCalendar.css';

const GordonScheduleCalendar = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState();
  const [currentSession, setCurrentSession] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile, props.reloadCall]);

  const loadData = async (searchedUser) => {
    setLoading(true);
    let courseInfo = null;
    try {
      const schedule = await scheduleService.getSchedule(searchedUser.AD_Username, props.term);
      courseInfo = scheduleService.makeScheduleCourses(schedule);
    } catch (e) {
      setLoading(false);
    }

    if (courseInfo) {
      setEventInfo(courseInfo);
    }

    let currentSession =
      props.term === '' ? await session.getCurrent() : await session.get(props.term);
    setCurrentSession(currentSession);
    setLoading(false);
  };
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Monday' },
    { resourceId: 2, resourceTitle: 'Tuesday' },
    { resourceId: 3, resourceTitle: 'Wednesday' },
    { resourceId: 4, resourceTitle: 'Thursday' },
    { resourceId: 5, resourceTitle: 'Friday' },
    { resourceId: 6, resourceTitle: 'Saturday' },
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
        onDoubleClickEvent={(event) => props.handleDoubleClick(event)}
        defaultDate={Moment(new Date())}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        formats={formats}
      />
    );
    content = Resource(momentLocalizer(Moment));
  }

  return <>{content}</>;
};

export default GordonScheduleCalendar;
