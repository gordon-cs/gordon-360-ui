import { Typography, List } from '@mui/material';

import styles from '../List.module.css';
import { Activity } from 'services/recim/activity';
import ActivityListItem from './ActivityItem';

type Props = {
  activities: Activity[];
};

const ActivityList = ({ activities }: Props) =>
  !activities?.length ? (
    <Typography className={styles.secondaryText}>No activities to show.</Typography>
  ) : (
    <List dense>
      {activities.map((activity) => (
        <ActivityListItem key={activity.ID} activity={activity} />
      ))}
    </List>
  );

export default ActivityList;
