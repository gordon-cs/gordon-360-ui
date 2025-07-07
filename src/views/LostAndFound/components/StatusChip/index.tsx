import { Chip } from '@mui/material';
import styles from './StatusChip.module.css';
import { capitalizeString } from '../Helpers';

interface Props {
  status: string;
}

export const StatusChip: React.FC<Props> = ({ status }) => {
  let formattedStatus = capitalizeString(status);

  let chipColor: 'primary' | 'secondary' | 'success' | 'error' | 'neutral' | 'info' = 'primary';

  if (status === 'found') {
    chipColor = 'success';
  } else if (status === 'disposed' || status === 'pickedup') {
    chipColor = 'info';
  } else if (status === 'active') {
    chipColor = 'secondary';
  } else if (status === 'deleted') {
    chipColor = 'error';
  } else if (status === 'expired') {
    chipColor = 'neutral';
  } else {
    chipColor = 'primary';
  }

  //@ts-ignore
  return <Chip label={formattedStatus} color={chipColor} className={styles.chip} />;
};
