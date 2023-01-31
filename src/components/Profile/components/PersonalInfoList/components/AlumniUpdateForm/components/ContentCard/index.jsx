import { Grid, Card, CardContent, CardHeader } from '@mui/material/';
import styles from './ContentCard.module.css';

const ContentCard = (props) => {
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
