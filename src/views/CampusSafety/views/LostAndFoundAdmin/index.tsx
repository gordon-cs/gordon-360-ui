import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Grid, Button } from '@mui/material';
import Header from 'views/CampusSafety/components/Header';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Construction, Person, Storage } from '@mui/icons-material';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  // const isAdmin = true; //FOR TESTING PURPOSES
  const navigate = useNavigate();
  const [missingReports, setMissingReports] = useState<MissingItemReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMissingItems = async () => {
      setLoading(true);
      try {
        const fetchedReports = await lostAndFoundService.getMissingItemReports();
        setMissingReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching missing items:', error);
        setMissingReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingItems();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  const MissingDatabaseSummary = (
    <>
      Active: {missingReports.filter((report) => report.status === 'active').length} {' | '} Total:{' '}
      {missingReports.length}
    </>
  );

  const LostItemDatabase = (
    <>
      <Grid container rowGap={1}>
        <Grid item xs={12}>
          {MissingDatabaseSummary}
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate('missingitemdatabase');
            }}
          >
            <Storage />
            <span className={styles.spacing}></span>
            <b>Lost Items Database</b>
          </Button>
        </Grid>
      </Grid>
    </>
  );

  const ReportLostItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('reportitemforothers');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Report Item for Others</b>
    </Button>
  );

  const lostItemsCard = (
    <>
      <Card>
        <CardHeader title="Lost Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {LostItemDatabase}
            </Grid>
            <Grid container item xs={12}>
              {ReportLostItem}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const FoundItemDatabase = (
    <Button
      color="secondary"
      variant="contained"
      disabled
      onClick={() => {
        navigate('founditemdatabase');
      }}
    >
      <Storage />
      <span className={styles.spacing}></span>
      <b>Found Items Database</b>
    </Button>
  );

  const FoundItemsCard = (
    <>
      <Card>
        <CardHeader title="Found Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {FoundItemDatabase}
            </Grid>
            <Construction color="error" />
            <Typography>
              Under Construction! Use the existing system in FileMaker for found items
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'}>
        <Grid item xs={11}>
          <Card>
            <CardHeader title={'Gordon Lost & Found Admin'} className={styles.title}></CardHeader>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {lostItemsCard}
                </Grid>
                <Grid item xs={12} md={6}>
                  {FoundItemsCard}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundAdmin;
