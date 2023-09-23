import { useEffect, useState } from 'react';
import GordonLoader from 'components/Loader';
import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import scheduleService, { scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';

const GordonScheduleCalendar = ({ schedule, onSelectEvent }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      const events = scheduleService.makeScheduleCourses(schedule.AllCourses);
      setEvents(events);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [schedule]);

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Calendar
        events={events}
        localizer={momentLocalizer(Moment)}
        min={dayStart}
        max={dayEnd}
        step={15}
        timeslots={4}
        defaultView="day"
        defaultDate={Moment(new Date())}
        resources={scheduleCalendarResources}
        formats={{
          dayHeaderFormat: () => schedule.SessionDescription,
        }}
        onSelectEvent={onSelectEvent}
      />
    );
  }
};

export default GordonScheduleCalendar;
