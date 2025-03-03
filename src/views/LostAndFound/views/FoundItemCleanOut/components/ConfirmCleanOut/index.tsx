import { FoundItem } from 'services/lostAndFound';
import styles from './ConfirmCleanOut.module.scss';
import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';

interface ConfirmCleanOutProps {
  reportsToCleanOut: FoundItem[];
}

const ConfirmCleanOut: React.FC<ConfirmCleanOutProps> = ({ reportsToCleanOut }) => {
  return (
    <Card className={styles.confirmCard}>
      <CardHeader
        title="Clean Out Selected Items"
        className={styles.header}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <Typography>Input the final status of the following items.</Typography>
      </CardContent>
    </Card>
  );
};

export default ConfirmCleanOut;
