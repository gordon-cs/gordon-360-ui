import { Button, Card, CardContent, Grid } from '@mui/material/';
import { authenticate } from 'services/auth';

/**
 * @param {Object} props props
 * @param {string} props.feature - Text representing the content the user tried to access
 * @returns {JSX.Element} A card with a message that the user must log in to view content
 */
const GordonUnauthorized = ({ feature }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent
            style={{
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <h1>You are not logged in.</h1>
            <br />
            <h4>You must be logged in to view {feature}.</h4>
            <br />
            <Button color="primary" variant="contained" onClick={authenticate}>
              Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GordonUnauthorized;
