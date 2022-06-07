import { Grid, Typography } from '@material-ui/core';
import Media from 'react-media';
import { gordonColors } from 'theme';

const styles2 = {
  headerStyle: {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '1.5rem 0.75rem',
  },
};

const PeopleSearchHeader = ({ displayLargeImage }) => {
  return (
    <div style={styles2.headerStyle}>
      <Media query="(min-width: 960px)">
        {(matches) =>
          matches && !displayLargeImage ? (
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
          )
        }
      </Media>
    </div>
  );
};

export default PeopleSearchHeader;
