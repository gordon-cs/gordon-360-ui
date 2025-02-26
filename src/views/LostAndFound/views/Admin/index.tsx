import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Grid, Button } from '@mui/material';
import Header from 'views/LostAndFound/components/Header';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Construction, Person, Storage } from '@mui/icons-material';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin && !isDev) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  const LostItemDatabase = (
    <>
      <Grid container rowGap={1}>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate('missingitemdatabase?status=active');
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
      onClick={() => {
        navigate('founditemdatabase');
      }}
    >
      <Storage />
      <span className={styles.spacing}></span>
      <b>Found Items Database</b>
    </Button>
  );

  const EnterFoundItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemform');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Enter Found Item</b>
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
            <Grid container item xs={12}>
              {EnterFoundItem}
            </Grid>
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
