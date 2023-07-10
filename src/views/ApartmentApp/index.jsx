import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import StudentApplication from './components/StudentApplication';

//Imports for application period closed view
import { Card, CardContent, Grid, Button, Link } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { AuthGroup } from 'services/auth';
import styles from './ApartmentApp.module.css';
import StaffMenu from './components/StaffMenu';

const ApartApp = () => {
  const [loading, setLoading] = useState(true);
  const { profile, loading: loadingProfile } = useUser();
  const [isUserStudent, setIsUserStudent] = useState(false);
  const isHousingAdmin = useAuthGroups(AuthGroup.HousingAdmin);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      try {
        setIsUserStudent(profile.PersonType.includes('stu'));
      } catch {
        setIsUserStudent(false);
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setIsUserStudent(false);
      setLoading(false);
    }
  }, [profile]);

  if (loading || loadingProfile) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthenticated feature={'the Apartment Application page'} />;
  } else if (isOnline) {
    if (isHousingAdmin) {
      return (
        <div className={styles.staff_apartment_application}>
          <StaffMenu userProfile={profile} />
        </div>
      );
    } else if (isUserStudent) {
      return (
        <div className={'student_apartment_application'}>
          <StudentApplication userProfile={profile} />
        </div>
        // MJ Note, does this code still get used/should we automate it somehow?
        // Also should this be seperated into its own component?
        /*
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
                <h1>Apartment Application Period Closed</h1>
                <h4>
                  The apartment application period closed at 5PM, Monday April 4th, 2022. Please
                  contact{' '}
                  <a href="mailto:housing@gordon.edu" className="gc360_text_link">
                    the Housing Office (Housing@gordon.edu)
                  </a>{' '}
                  with any questions.
                </h4>
                <br />
                <br />
                <Button variant="contained" component={Link} to="/">
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        */
      );
    } else {
      return (
        <GordonLimitedAvailability
          pageName="Apartment Application"
          availableTo="students or housing staff"
        />
      );
    }
  } else {
    return <GordonOffline feature="Apartment Applications" />;
  }
};

export default ApartApp;
