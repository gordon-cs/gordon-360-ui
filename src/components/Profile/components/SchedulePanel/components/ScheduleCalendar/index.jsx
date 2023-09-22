import { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService from 'services/schedule';
import session from 'services/session';
import './ScheduleCalendar.css';

const resourceMap = [
  { resourceId: 'MO', resourceTitle: 'Monday' },
  { resourceId: 'TU', resourceTitle: 'Tuesday' },
  { resourceId: 'WE', resourceTitle: 'Wednesday' },
  { resourceId: 'TH', resourceTitle: 'Thursday' },
  { resourceId: 'FR', resourceTitle: 'Friday' },
  { resourceId: 'SA', resourceTitle: 'Saturday' },
];

const GordonScheduleCalendar = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let courseInfo = null;
      try {
        const course = props.allCourses.filter((item) => item.SessionCode === props.term);
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

    loadData(props.profile);
  }, [props.allCourses, props.profile, props.reloadCall, props.term]);

  // Localizer is always required for react-big-calendar initialization
  let formats = {
    dayHeaderFormat: (date, localizer = momentLocalizer(Moment)) =>
      localizer.format(date, `[${currentSession.SessionDescription}]`),
  };

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  if (loading) {
    return <GordonLoader />;
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
    return Resource(momentLocalizer(Moment));
  }
};

export default GordonScheduleCalendar;
