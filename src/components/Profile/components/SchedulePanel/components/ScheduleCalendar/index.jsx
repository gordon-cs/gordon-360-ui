import { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService from 'services/schedule';
import './ScheduleCalendar.css';

const resourceMap = [
  { resourceId: 'MO', resourceTitle: 'Monday' },
  { resourceId: 'TU', resourceTitle: 'Tuesday' },
  { resourceId: 'WE', resourceTitle: 'Wednesday' },
  { resourceId: 'TH', resourceTitle: 'Thursday' },
  { resourceId: 'FR', resourceTitle: 'Friday' },
  { resourceId: 'SA', resourceTitle: 'Saturday' },
];

const GordonScheduleCalendar = ({ allCourses, session, profile, isOnline, onSelectEvent }) => {
  const [loading, setLoading] = useState(true);
  const [eventInfo, setEventInfo] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let courseInfo = null;
      try {
        const course = allCourses.filter((item) => item.SessionCode === session.SessionCode);
        courseInfo = scheduleService.makeScheduleCourses(course[0].AllCourses);
      } catch (e) {
        setLoading(false);
      }

      if (courseInfo) {
        setEventInfo(courseInfo);
      }

      setLoading(false);
    };

    loadData(profile);
  }, [allCourses, profile, session]);

  // Localizer is always required for react-big-calendar initialization
  let formats = {
    dayHeaderFormat: (date, localizer = momentLocalizer(Moment)) =>
      localizer.format(date, `[${session.SessionDescription}]`),
  };

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Calendar
        selectable={isOnline}
        events={eventInfo}
        localizer={momentLocalizer(Moment)}
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
        onSelectEvent={onSelectEvent}
        onSelecting={(slot) => false}
      />
    );
  }
};

export default GordonScheduleCalendar;
