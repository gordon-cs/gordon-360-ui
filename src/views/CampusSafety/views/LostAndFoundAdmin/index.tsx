import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Grid, Button } from '@mui/material';
import Header from 'views/CampusSafety/components/Header';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  // const isAdmin = true; //FOR TESTING PURPOSES
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'}>
        <Grid item xs={11}>
          <Card>
            <CardHeader title={'LostAndFound Admin'} className={styles.title}></CardHeader>
            <CardContent>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate('missingitemdatabase');
                }}
              >
                <b>Missing Item Database</b>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundAdmin;
