import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';

/**
 * @param {String} feature - Text representing the content the user tried to access
 *
 * @returns {JSX.Element} A card with a message that the user must connect to view content
 */
const GordonOffline = ({ feature }) => {
  return (
    <Grid container justify="center" spacing="16">
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
            <h1>Please Re-establish Connection</h1>
            <h4>{feature} is unavailable because you are not connected to the network.</h4>
            <br />
            <br />
            <Button
              color="primary"
              backgroundColor="white"
              variant="outlined"
              onClick={() => {
                window.location.pathname = '';
              }}
            >
              Back To Home
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

GordonOffline.propTypes = {
  feature: PropTypes.string.isRequired,
};

export default GordonOffline;
