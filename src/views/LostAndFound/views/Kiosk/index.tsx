import { useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import Header from 'views/LostAndFound/components/Header';
import kioskStyles from './KioskUser.module.scss';

const LostAndFoundKiosk = () => {
  // Check for kiosk, admin, or developer group
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);

  const navigate = useNavigate();

  // If user is not kiosk, admin, or dev, navigate away
  useEffect(() => {
    if (!isKiosk && !isAdmin && !isDev) {
      navigate('/lostandfound');
    }
  }, [isKiosk, isAdmin, isDev, navigate]);

  const handleCheckInventory = () => {
    navigate('/lostandfound/kiosk/founditemdatabase');
  };

  const handleReportMissing = () => {
    navigate('/lostandfound/kiosk/reportitemforothers');
  };

  return (
    <>
      <Header />
      <Grid container justifyContent="center" className={kioskStyles.container}>
        <Grid item xs={11} sm={10} md={6} lg={5}>
          <Card className={kioskStyles.card}>
            <CardHeader
              title={
                <Typography variant="h4" className={kioskStyles.title}>
                  Is Someone Missing an Item?
                </Typography>
              }
              className={kioskStyles.cardHeader}
            />
            <CardContent className={kioskStyles.cardContent}>
              <Grid container direction="column" rowGap={3}>
                <Grid item>
                  <Typography variant="h6" className={kioskStyles.stepHeading}>
                    1. Check found item inventory
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={kioskStyles.actionButton}
                    onClick={handleCheckInventory}
                  >
                    Gordon Police Inventory
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={kioskStyles.stepHeading}>
                    2. Report to Gordon Police if not in their inventory
                  </Typography>
                  <Typography variant="body2" className={kioskStyles.subText}>
                    Students, Faculty, and Staff can report it themselves on Gordon 360
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={kioskStyles.actionButton}
                    onClick={handleReportMissing}
                  >
                    Report Missing Item
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundKiosk;
