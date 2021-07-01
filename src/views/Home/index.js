import React, { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
//import WellnessQuestion from 'components/WellnessQuestion';
import GuestWelcome from './components/GuestWelcome';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import NewsCard from './components/NewsCard';
import user from 'services/user';
// import wellness from 'services/wellness';
// import storage from 'services/storage';
import './home.css';
import { Grid } from '@material-ui/core';
const Home = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [personType, setPersonType] = useState(null);
  // const [networkStatus, setNetworkStatus] = useState('online');
  // const [hasAnswered, setHasAnswered] = useState(null);
  ////
  // useEffect(() => {
  //   // Retrieve network status from local storage or default to online
  //   try {
  //     setNetworkStatus(storage.get('network-status'));
  //   } catch (error) {
  //     setNetworkStatus('online');
  //   }

  //   /* Used to re-render the page when the network connection changes.
  //    * The origin of the message is checked to prevent cross-site scripting attacks
  //    */
  //   window.addEventListener('message', (event) => {
  //     setNetworkStatus((prevStatus) => {
  //       if (
  //         event.origin === window.location.origin &&
  //         (event.data === 'online' || event.data === 'offline')
  //       ) {
  //         return event.data;
  //       }
  //       return prevStatus;
  //     });
  //   });

  //   return () => window.removeEventListener('message', () => {});
  // }, []);

  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      // Clear out component's person-specific state when authentication becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      // setHasAnswered(null);
      setPersonType(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authentication]);

  const loadPage = async () => {
    setLoading(true);
    const [{ PersonType } /*, { IsValid }*/] = await Promise.all([
      user.getProfileInfo(),
      /*wellness.getStatus(),*/
    ]);
    setPersonType(PersonType);
    // setHasAnswered(IsValid);
    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return <GuestWelcome onLogIn={onLogIn} />;
  } //else if (networkStatus === 'online' && !hasAnswered) {
  //return <WellnessQuestion setStatus={() => setHasAnswered(true)} />;}
  else {
    let doughnut = personType.includes('stu') ? <CLWCreditsDaysLeft /> : <DaysLeft />;

    return (
      <Grid container justify="center" spacing={2}>
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
