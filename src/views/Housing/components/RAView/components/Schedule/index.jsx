import ScheduleCalendar from '/src/components/Profile/components/SchedulePanel/components/ScheduleCalendar/index.tsx';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import '/src/components/Profile/components/SchedulePanel/components/ScheduleCalendar/ScheduleCalendar.scss';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

const Schedule = () => {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(24, 0, 0, 0);

  const scheduleResources = [
    { id: 'SU', title: 'Sunday' },
    { id: 'MO', title: 'Monday' },
    { id: 'TU', title: 'Tuesday' },
    { id: 'WE', title: 'Wednesday' },
    { id: 'TH', title: 'Thursday' },
    { id: 'FR', title: 'Friday' },
    { id: 'SA', title: 'Saturday' },
  ];

  return (
    <Calendar
      style={{ whiteSpace: 'pre-wrap' }}
      //events={courseFormat}
      localizer={localizer}
      min={dayStart}
      max={dayEnd}
      step={15}
      timeslots={4}
      defaultView="day"
      resources={scheduleResources}
      // formats={{
      //   dayHeaderFormat: () => schedule.session.SessionDescription,
      // }}
      //onSelectEvent={onSelectEvent}
      // onKeyPressEvent={(selectedEvent, keyPressEvent) => {
      //   if (
      //     'key' in keyPressEvent &&
      //     typeof keyPressEvent.key === 'string' &&
      //     keyPressEvent.key === 'Enter'
      //   ) {
      //     onSelectEvent(selectedEvent);
      //   }
      // }}
    />
  );
};

export default Schedule;
