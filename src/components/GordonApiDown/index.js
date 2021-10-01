import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';

/**
 * @param {String} feature - Text representing the content the user tried to access
 *
 * @returns {JSX.Element} A card with a message that the user must connect to view content
 */
const GordonApiDown = () => {
  return (
    <Grid container justifyContent="center" spacing="16">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent
            style={{
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <Grid
              item
              xs={2}
              alignItems="center"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <NoConnectionImage />
            </Grid>
            <br />
            <h1>Oops, Something Went Wrong</h1>
            <h4>
              We seem to be having trouble connecting you to Gordon 360. Please try refreshing the
              page.
            </h4>
            <h4>
              If issues persist, contact our technology department at{' '}
              <a class="gc360_link" href="mailto:cts@gordon.edu">
                CTS@gordon.edu
              </a>
              .
            </h4>
            <br />
            <br />
            <Button
              color="primary"
              backgroundColor="white"
              variant="outlined"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

GordonApiDown.propTypes = {
  feature: PropTypes.string.isRequired,
};

export default GordonApiDown;
