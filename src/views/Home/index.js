// @TODO CSSMODULES - moved to global styles until a better solution is found
// import styles from './Home.module.css';
import { Grid } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import WellnessQuestion from 'components/WellnessQuestion';
import { useAuth } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import user from 'services/user';
// @ACADEMIC-CHECKIN disabled line below until getting the correct dates can be done
// import { Redirect } from 'react-router-dom';
import wellness from 'services/wellness';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
// @ACADEMIC-CHECKIN disabled line below until getting the correct dates can be done
// import checkInService from 'services/checkIn';
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [personType, setPersonType] = useState(null);
  // @ACADEMIC-CHECKIN disabled line below until getting the correct dates can be done
  // const [checkedIn, setCheckedIn] = useState(null);

  const [hasAnswered, setHasAnswered] = useState(null);
  const isOnline = useNetworkStatus();
  const authenticated = useAuth();

  useEffect(() => {
    if (authenticated) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setHasAnswered(null);
      setPersonType(null);
      setLoading(false);
    }
  }, [authenticated]);
  const loadPage = async () => {
    setLoading(true);
    const [{ PersonType }, { IsValid }] = await Promise.all([
      user.getProfileInfo(),
      wellness.getStatus(),
    ]);
    // @ACADEMIC-CHECKIN disabled line below until getting the correct dates can be done
    // setCheckedIn(await checkInService.getStatus());
    setPersonType(PersonType);
    setHasAnswered(IsValid);
    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!authenticated) {
    return <GuestWelcome />;
  } else if (isOnline && !hasAnswered) {
    return <WellnessQuestion setStatus={() => setHasAnswered(true)} />;
  }
  // @ACADEMIC-CHECKIN disabled line below until getting the correct dates can be done
  // else if (!checkedIn && personType.includes('stu')) {
  //   return (<Redirect to='/AcademicCheckIn' />);
  else {
    let doughnut = personType.includes('stu') ? <CLWCreditsDaysLeft /> : <DaysLeft />;

    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={5}>
          {doughnut}
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <NewsCard />
        </Grid>
      </Grid>
    );
  }
};

export default Home;
