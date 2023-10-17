import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { Schedule, CourseEvent, ScheduleResource } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  schedule: Schedule;
  activeDays: ScheduleResource[];
  onSelectEvent: (event: CourseEvent) => void;
};

const GordonScheduleCalendar = ({ schedule, onSelectEvent, activeDays }: Props) => {
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
      resources={activeDays as unknown as object[]}
      formats={{
        dayHeaderFormat: () => schedule.Session.SessionDescription,
      }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default GordonScheduleCalendar;
