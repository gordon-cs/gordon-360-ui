import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { CourseEvent, scheduleResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  courses: CourseEvent[];
  termDescription: string;
  onSelectEvent: (event: CourseEvent) => void;
};

const GordonScheduleCalendar = ({ courses, termDescription, onSelectEvent }: Props) => {
  const activeDays = scheduleResources.filter(
    (r) => (r.id !== 'S' && r.id !== 'U') || courses.some((c) => c.resourceId === r.id),
  );

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  return (
    <Calendar
      events={courses}
      eventPropGetter={(event) => {
        if (event.isSubtermCourse) {
          return { className: 'subterm' };
        } else {
          return {};
        }
      }}
      localizer={localizer}
      min={dayStart}
      max={dayEnd}
      step={15}
      timeslots={4}
      defaultView="day"
      resources={activeDays as unknown as object[]}
      formats={{ dayHeaderFormat: () => termDescription }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default GordonScheduleCalendar;
