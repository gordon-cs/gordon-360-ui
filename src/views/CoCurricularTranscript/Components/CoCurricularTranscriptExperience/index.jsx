import { format, parseISO } from 'date-fns';
import styles from './CoCurricularTranscriptExperience.module.css';

const Experience = ({ Experience }) => (
  <div className={styles.experience_transcript_activities}>
    <div className={styles.organization_role}>
      {Experience.Job_Department_Name}, {Experience.Job_Title}
    </div>
    <div className={styles.date}> {formatDuration(Experience)} </div>
  </div>
);

const formatDuration = ({ Job_Start_Date, Job_End_Date }) => {
  if (!Job_Start_Date) {
    return null;
  }

  const startDate = parseISO(Job_Start_Date);

  if (!Job_End_Date) {
    return format(startDate, "MMM yyyy '- Present'");
  }

  const endDate = parseISO(Job_End_Date);

  if (endDate.getFullYear() === startDate.getFullYear()) {
    return `${format(startDate, 'MMM')} - ${format(endDate, 'MMM yyyy')}`;
  } else {
    return `${format(startDate, 'MMM yyyy')} - ${format(endDate, 'MMM yyyy')}`;
  }
};

export default Experience;
