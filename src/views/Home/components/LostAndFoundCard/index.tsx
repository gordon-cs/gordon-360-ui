import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
const LostAndFoundCard = () => {
  //const [news, setNews] = useState([]);
  //useEffect(() => {
  //  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);
  //}, []);
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row">
            <Grid item xs={7}>
              Lost and Found
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/campussafety/LostAndFound/missingitemform"
            >
              Report Lost Item
            </Button>
          </Grid>
          <Box alignItems={'right'}>
            <Grid item xs={5}>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/campussafety/LostAndFound"
              >
                Report Found Item
              </Button>
            </Grid>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default LostAndFoundCard;
