import { format, parseISO } from 'date-fns';
import { StudentEmployment } from 'services/transcript';
import styles from './CoCurricularTranscriptExperience.module.css';

type Props = {
  Experience: StudentEmployment;
};

const Experience = ({ Experience }: Props) => (
  <div className={styles.experience_transcript_activities}>
    <div className={styles.organization_role}>
      {Experience.Job_Department_Name}, {Experience.Job_Title}
    </div>
    <div className={styles.date}> {formatDuration(Experience)} </div>
  </div>
);

const formatDuration = ({ Job_Start_Date, Job_End_Date }: StudentEmployment) => {
  if (!Job_Start_Date) {
    return '';
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
