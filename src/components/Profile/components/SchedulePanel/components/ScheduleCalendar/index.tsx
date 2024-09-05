import { Calendar, luxonLocalizer } from 'react-big-calendar';
import scheduleService, { CourseEvent, scheduleResources, Term } from 'services/schedule';
import './ScheduleCalendar.css';
import { DateTime } from 'luxon';
import { set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import GordonLoader from 'components/Loader';
import ScheduleDialog from '../ScheduleDialog';

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

type Props = {
  term: Term;
  username: string;
  isPersonalProfile: boolean;
};

const GordonScheduleCalendar = ({ username, term, isPersonalProfile }: Props) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseEvent[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseEvent | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setSelectedCourse(null);

      const termCourses = await scheduleService.getCourses(
        username,
        term.YearCode,
        term.TermCode,
        term.SubtermCode,
      );
      setCourses(termCourses);

      setLoading(false);
    };

    loadCourses();
  }, [term, username]);

  const activeDays = useMemo(
    () =>
      scheduleResources.filter(
        (r) => (r.id !== 'S' && r.id !== 'U') || courses.some((c) => c.resourceId === r.id),
      ),
    [courses],
  );

  if (loading) return <GordonLoader />;

  const dayStart = set(new Date(), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 });
  const dayEnd = set(new Date(), { hours: 22, minutes: 0, seconds: 0, milliseconds: 0 });

  return (
    <>
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
        formats={{ dayHeaderFormat: () => term.Description }}
        onSelectEvent={setSelectedCourse}
      />

      {selectedCourse && (
        <ScheduleDialog
          onClose={() => setSelectedCourse(null)}
          course={selectedCourse}
          isPersonalProfile={isPersonalProfile}
        />
      )}
    </>
  );
};

export default GordonScheduleCalendar;
