import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import StudentApplication from './components/StudentApplication';

//Imports for application period closed view
import {
  Card,
  CardContent,
  Grid,
  Button,
  Link,
  CardHeader,
  Typography,
  CardActions,
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { AuthGroup } from 'services/auth';
import styles from './ApartmentApp.module.css';
import StaffMenu from './components/StaffMenu';
import { ApplicationProcessDates } from 'services/housing';
import { format } from 'date-fns';
import InstructionsCard from './components/StudentApplication/components/InstructionsCard';

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
  } else if (!isOnline) {
    return <GordonOffline feature="Apartment Applications" />;
  } else {
    if (isHousingAdmin) {
      return (
        <div className={styles.staff_apartment_application}>
          <StaffMenu userProfile={profile} />
        </div>
      );
    } else if (isUserStudent) {
      const now = Date.now();
      if (now < ApplicationProcessDates.applicationAvailableAt.getTime()) {
        return (
          <Grid container justifyContent="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="Apartment Application Opens Soon" className="gc360_header" />
                <CardContent>
                  <Typography>
                    The apartment application period will open at{' '}
                    {format(ApplicationProcessDates.applicationAvailableAt, "b 'on' MMMM do")}.
                  </Typography>
                  <br />
                  <Typography>
                    For the latest information, check the{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gc360_text_link"
                      href="https://gordon.instructure.com/courses/13668/pages/apartment-application-process-2026-2027?module_item_id=695026"
                    >
                      Apartment Application Process 2026-2027 page in Canvas
                    </a>
                    .
                  </Typography>
                  <br />
                  <Typography>
                    Questions? Email{' '}
                    <a
                      className="gc360_text_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:Housing@gordon.edu"
                    >
                      Housing@gordon.edu
                    </a>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" component={Link} to="/">
                    Back to Home
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        );
      } else if (now > ApplicationProcessDates.applicationSubmissionDeadline.getTime()) {
        return (
          <Grid container justifyContent="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title="Apartment Application Closed" className="gc360_header" />
                <CardContent>
                  <Typography>
                    The apartment application period ended at{' '}
                    {format(
                      ApplicationProcessDates.applicationSubmissionDeadline,
                      "b 'on' MMMM do",
                    )}
                    .
                  </Typography>
                  <br />
                  <Typography>
                    For the latest information, check the{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gc360_text_link"
                      href="https://gordon.instructure.com/courses/13668/pages/apartment-application-process-2026-2027?module_item_id=695026"
                    >
                      Apartment Application Process 2026-2027 page in Canvas
                    </a>
                    .
                  </Typography>
                  <br />
                  <Typography>
                    Questions? Email{' '}
                    <a
                      className="gc360_text_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:Housing@gordon.edu"
                    >
                      Housing@gordon.edu
                    </a>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" component={Link} to="/">
                    Back to Home
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <div className={'student_apartment_application'}>
            <StudentApplication userProfile={profile} />
          </div>
        );
      }
    } else {
      return (
        <GordonLimitedAvailability
          pageName="Apartment Application"
          availableTo="students or housing staff"
        />
      );
    }
  }
};

export default ApartApp;
