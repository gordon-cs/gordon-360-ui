import { format } from 'date-fns';
import { StudentEmployment } from 'services/transcript';
import styles from './Experience.module.css';

type Props = {
  Experience: StudentEmployment;
};

const Experience = ({ Experience }: Props) => {
  const jobTitles = newJobTitle(Experience);
  return (
    <div
      className={
        jobTitles === ''
          ? `${styles.experience_transcript_activities} ${styles.empty_title}`
          : styles.experience_transcript_activities
      }
    >
      <div className={styles.organization_role}>{jobTitles}</div>
      <div className={styles.date}> {formatDuration(Experience)} </div>
    </div>
  );
};

const formatDuration = ({ Job_Start_Date, Job_End_Date }: StudentEmployment) => {
  if (!Job_Start_Date) {
    return '';
  }

  const startDate = new Date(Date.parse(Job_Start_Date));

  if (!Job_End_Date) {
    return format(startDate, "MMM yyyy '- Present'");
  }

  const endDate = new Date(Date.parse(Job_End_Date));

  if (endDate.getFullYear() === startDate.getFullYear()) {
    return `${format(startDate, 'MMM')} - ${format(endDate, 'MMM yyyy')}`;
  } else {
    return `${format(startDate, 'MMM yyyy')} - ${format(endDate, 'MMM yyyy')}`;
  }
};

const newJobTitle = ({ Job_Department_Name, Job_Title }: StudentEmployment) => {
  if (Job_Title === '') {
    return '';
  }
  return Job_Title === '' ? Job_Title : `${Job_Department_Name}, ${Job_Title}`;
};

export default Experience;
