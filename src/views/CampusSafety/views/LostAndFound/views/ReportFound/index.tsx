import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { LocalLibrary, LocalPolice } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import Header from 'views/CampusSafety/components/Header';

const ReportFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Card>
        <CardHeader
          title={
            <b>
              Report a <u>Found</u> Item
            </b>
          }
          titleTypographyProps={{ align: 'center' }}
          className="gc360_header"
        />
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
    </>
  );
};

export default ReportFound;
