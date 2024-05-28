import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { CourseEvent, Schedule, scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  schedule: Schedule;
  onSelectEvent: (event: CourseEvent) => void;
};
function detectMobile() {
  if (window.innerWidth >= 1514) {
    return false;
  }
}

export function mobileFormat() {
  if (detectMobile() == false) {
    return ' | ';
  } else {
    return ' ';
  }
}
const GordonScheduleCalendar = ({ schedule, onSelectEvent }: Props) => {
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
      resources={scheduleCalendarResources as unknown as object[]}
      formats={{
        dayHeaderFormat: () => schedule.session.SessionDescription,
      }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default GordonScheduleCalendar;
