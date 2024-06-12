import { format } from 'date-fns';
import { StudentEmployment } from 'services/transcript';
import styles from './Experience.module.css';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  Experience: StudentEmployment;
  previousTitles: string[];
  setPreviousTitles: Dispatch<SetStateAction<string[]>>;
};

const Experience = ({ Experience, previousTitles, setPreviousTitles }: Props) => {
  const jobTitles = newJobTitle(Experience, previousTitles, setPreviousTitles);
  const experienceTranscript =
    jobTitles === ''
      ? styles.experience_transcript_activities_empty_titles
      : styles.experience_transcript_activities;
  return (
    <div className={experienceTranscript}>
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

const newJobTitle = (
  { Job_Department_Name, Job_Title }: StudentEmployment,
  previousTitles: string[],
  setPreviousTitles: Dispatch<SetStateAction<string[]>>,
) => {
  if (!previousTitles.includes(Job_Title)) {
    previousTitles.push(Job_Title);
    setPreviousTitles(previousTitles);
    return Job_Department_Name === Job_Title.split(':')[0]
      ? Job_Title
      : `${Job_Department_Name}, ${Job_Title}`;
  }
  return '';
};

export default Experience;
