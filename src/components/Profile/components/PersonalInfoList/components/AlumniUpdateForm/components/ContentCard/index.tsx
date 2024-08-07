import { Grid, Card, CardContent, CardHeader } from '@mui/material/';
import styles from './ContentCard.module.css';
import { ReactNode } from 'react';

const ContentCard = (props: { title?: string; children: ReactNode }) => {
  return (
    <Card>
      <CardHeader className={styles.update_header} title={props.title} />
      <CardContent>
        <Grid container spacing={2}>
          {props.children}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { ContentCard };
