import React, { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService from 'services/schedule';
import session from 'services/session';
import './ScheduleCalendar.css';
import { Schedule } from '@mui/icons-material';

const GordonScheduleCalendar = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState();
  const [currentSession, setCurrentSession] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allCoursess, setAllCoursess] = useState([]);

  useEffect(() => {
    loadData(props.profile);
  }, [props.profile, props.reloadCall]);

  const loadData = async () => {
    setLoading(true);
    let courseInfo = null;
    try {
      const course = props.allCourses.filter((item) => item.SessionCode === props.term);
      setAllCourses(course);
      courseInfo = scheduleService.makeScheduleCourses(course[0].AllCourses);
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
    { resourceId: 'MO', resourceTitle: 'Monday' },
    { resourceId: 'TU', resourceTitle: 'Tuesday' },
    { resourceId: 'WE', resourceTitle: 'Wednesday' },
    { resourceId: 'TH', resourceTitle: 'Thursday' },
    { resourceId: 'FR', resourceTitle: 'Friday' },
    { resourceId: 'SA', resourceTitle: 'Saturday' },
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
        defaultDate={Moment(new Date())}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        formats={formats}
        onSelectEvent={props.onSelectEvent}
        onSelecting={(slot) => false}
      />
    );
    content = Resource(momentLocalizer(Moment));
  }

  return <>{content}</>;
};

export default GordonScheduleCalendar;
