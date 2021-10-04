import { Grid, Card, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const GordonLimitedAvailability = ({
  pageName,
  backToLocation,
  backToLink,
  availableTo,
  ...OtherProps
}) => {
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
            <br />
            <h1>{pageName + ' Unavailable'}</h1>
            <h4>`The ${pageName} page is available for ${availableTo} only.`</h4>
            <br />
            <br />
            <Button variant="contained" component={Link} to={backToLink}>
              Back to {backToLocation}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GordonLimitedAvailability;
