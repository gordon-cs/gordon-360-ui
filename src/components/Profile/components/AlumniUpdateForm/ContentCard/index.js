import { Grid, Card, CardContent, CardHeader } from '@material-ui/core/';
import styles from '../Update.module.css';

const ContentCard = (props) => {
  return (
    <Card>
      <CardHeader className={styles.update_header} title={props.title} />
      <CardContent>
        <Grid container>{props.children}</Grid>
      </CardContent>
    </Card>
  );
};

export { ContentCard };
