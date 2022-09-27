import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import styles from './PeopleSearchHeader.module.scss';

interface Props {
  displayLargeImage: boolean;
}

const PeopleSearchHeader = ({ displayLargeImage }: Props) => {
  const isLargeHeader = useMediaQuery('(min-width: 960px)');

  const header =
    isLargeHeader && !displayLargeImage ? (
      <Grid container direction="row" alignItems="center">
        <Grid item xs={5}>
          <Typography
            variant="body2"
            style={{
              marginLeft: '6rem',
            }}
          >
            FULL NAME
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">TITLE/CLASS</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2">MAIL LOCATION</Typography>
        </Grid>
      </Grid>
    ) : (
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <Typography variant="body2">RESULTS</Typography>
        </Grid>
      </Grid>
    );

  return <div className={styles.header}>{header}</div>;
};

export default PeopleSearchHeader;
