import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material/';
import { authenticate } from 'services/auth';

type Props = {
  feature: string;
};

const GordonUnauthenticated = ({ feature }: Props) => {
  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Login Required" />
        <CardContent>
          <Typography>Please login to view {feature}.</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={authenticate}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default GordonUnauthenticated;
