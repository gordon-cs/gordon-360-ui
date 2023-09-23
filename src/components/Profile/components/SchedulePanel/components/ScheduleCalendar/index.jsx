import Moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';

const localizer = momentLocalizer(Moment);

const GordonScheduleCalendar = ({ schedule, onSelectEvent }) => {
  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  return (
    <Calendar
      events={schedule.courses}
      localizer={localizer}
      min={dayStart}
      max={dayEnd}
      step={15}
      timeslots={4}
      defaultView="day"
      defaultDate={Moment(new Date())}
      resources={scheduleCalendarResources}
      formats={{
        dayHeaderFormat: () => schedule.session.SessionDescription,
      }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default GordonScheduleCalendar;
