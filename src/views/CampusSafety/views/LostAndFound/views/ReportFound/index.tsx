import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { LocalLibrary, LocalPolice } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import Header from 'views/CampusSafety/components/Header';

const ReportFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10}>
          <Card>
            <CardHeader title={'Report a Found Item'} className="gc360_header" />
            <CardContent>
              <Typography>If you've found an item somewhere on campus:</Typography>
              <ul>
                <li>Please bring it to either:</li>
                <ul>
                  <li>
                    <Typography>
                      <LocalPolice /> Gordon Police
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      <LocalLibrary /> Jenks Library, circulation desk
                    </Typography>
                  </li>
                </ul>
              </ul>
              <Typography>So they can attempt to contact the owner</Typography>
              <br />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate('/lostandfound');
                }}
              >
                Back to Lost and Found
              </Button>
              <br />
              <br />
              <Typography>Questions?</Typography>
              <li>
                Contact Gordon Polce: <u>978-867-4444</u>
              </li>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportFound;
