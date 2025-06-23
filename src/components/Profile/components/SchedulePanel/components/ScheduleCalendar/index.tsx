import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { CourseEvent, Schedule, scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { format, getDay, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import EventWrapper from 'react-big-calendar/lib/addons/dragAndDrop';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales,
});

type Props = {
  schedule: Schedule;
  onSelectEvent: (event: CourseEvent) => void;
};

const EventWrapperCustom = ({ label }: { label: CourseEvent }) => {
  return <strong>test {label.title}</strong>;
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

  console.log(courseFormat);

  return (
    <Calendar
      //components={{event: EventWrapperCustom}}
      style={{ whiteSpace: 'pre-wrap' }}
      eventPropGetter={(event: CourseEvent) => {
        const firstQuadOfSemester = ['Fall 1', 'Spring 1', 'Summer 1'];
        const secondQuadOfSemester = ['Fall 2', 'Spring 2', 'Summer 2'];
        let subtermClassNames = ['subterm'];
        console.log(event.subtermCode);
        console.log(secondQuadOfSemester.includes(event.subtermCode));
        if (firstQuadOfSemester.includes(event.subtermCode)) {
          subtermClassNames.push('subterm1');
        } else if (secondQuadOfSemester.includes(event.subtermCode)) {
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
