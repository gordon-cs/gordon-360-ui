import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { CourseEvent, Schedule, scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { format, getDay, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales,
});

const firstQuadOfSemester = new Set(['Fall 1', 'Spring 1', 'Summer 1']);
const secondQuadOfSemester = new Set(['Fall 2', 'Spring 2', 'Summer 2']);

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
      eventPropGetter={(event: CourseEvent) => {
        let subtermClassNames = ['subterm'];

        if (firstQuadOfSemester.has(event.subtermCode || '')) {
          subtermClassNames.push('subterm1');
        } else if (secondQuadOfSemester.has(event.subtermCode || '')) {
          subtermClassNames.push('subterm2');
        } else {
          return {};
        }

        return { className: subtermClassNames.join(' ') };
      }}
      events={courseFormat}
      localizer={localizer}
      min={dayStart}
      max={dayEnd}
      step={15}
      timeslots={4}
      defaultView="day"
      resources={scheduleCalendarResources as unknown as object[]}
      formats={{
        dayHeaderFormat: () => schedule.term.Description,
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
