import {
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const GordonLimitedAvailability = ({
  pageName = '',
  backToLocation = 'Home',
  backToLink = '/',
  availableTo = 'students',
}) => (
  <Container maxWidth="sm">
    <Card>
      <CardHeader title={`${pageName} Unavailable`} />
      <CardContent>
        <Typography>
          {pageName ? `The ${pageName} page` : 'This page'} is available for {availableTo} only.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" component={Link} to={backToLink}>
          Back to {backToLocation}
        </Button>
      </CardActions>
    </Card>
  </Container>
);

export default GordonLimitedAvailability;
