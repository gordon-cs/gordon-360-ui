import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { CourseEvent, Schedule, scheduleCalendarResources } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';
import { useWindowSize } from 'hooks';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  schedule: Schedule;
  onSelectEvent: (event: CourseEvent) => void;
};

const GordonScheduleCalendar = ({ schedule, onSelectEvent }: Props) => {
  const [width] = useWindowSize();
  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(22, 0, 0, 0);

  const courseFormat = schedule.courses.map((course) => {
    let title;
    if (course.location.includes('ASY') || course.location.includes('null')) {
      title = `${course.title}`;
    } 
    else {
      title = `${course.title}${width >= 2212 ? ' | ' : ' '} ${course.location}`;
    }


    return { ...course, title };
  });

  return (
    <Calendar
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
