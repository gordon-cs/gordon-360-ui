import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { CourseEvent, Schedule, scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  schedule: Schedule;
  onSelectEvent: (event: CourseEvent) => void;
};

const GordonScheduleCalendar = ({ schedule, onSelectEvent }: Props) => {
  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  const courseFormat = schedule.courses.map((course) => {
    let tempTitle = `${course.title.replaceAll(' ', '')}`;
    let title;
    course.location.includes('ASY')
      ? (title = tempTitle + ' | ASYNC')
      : course.location.includes('null')
        ? (title = tempTitle)
        : (title = tempTitle + `\n${course.location}`);
    return { ...course, title };
  });

  return (
    <Calendar
      style={{ whiteSpace: 'pre-wrap' }}
      events={courseFormat}
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
      onKeyPressEvent={(selectedEvent, keyPressEvent) => {
        if (
          'key' in keyPressEvent &&
          typeof keyPressEvent.key === 'string' &&
          keyPressEvent.key === 'Enter'
        ) {
          onSelectEvent(selectedEvent);
        }
      }}
    />
  );
};

export default GordonScheduleCalendar;
