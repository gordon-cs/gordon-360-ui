import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { Schedule, ScheduleCourse, scheduleResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  schedule: Schedule;
  onSelectEvent: (event: ScheduleCourse) => void;
};

const GordonScheduleCalendar = ({ schedule, onSelectEvent }: Props) => {
  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  return (
    <Calendar
      events={schedule.Courses}
      localizer={localizer}
      min={dayStart}
      max={dayEnd}
      step={15}
      timeslots={4}
      defaultView="day"
      resources={scheduleResources as unknown as object[]}
      formats={{
        dayHeaderFormat: () => schedule.Session.SessionDescription,
      }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default GordonScheduleCalendar;
