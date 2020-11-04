import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import GordonLoader from '../../components/Loader';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import NewsCard from './components/NewsCard';
import Question from './components/Question';
import user from '../../services/user';
import wellness from '../../services/wellness';
import storage from '../../services/storage';
import Login from '../Login';
import './home.css';

const Home = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [personType, setPersonType] = useState(null);
  const [networkStatus, setNetworkStatus] = useState('online');
  const [answered, setAnswered] = useState(null);

  useEffect(() => {
    // Retrieve network status from local storage or default to online
    try {
      setNetworkStatus(storage.get('network-status'));
    } catch (error) {
      setNetworkStatus('online');
    }

    /* Used to re-render the page when the network connection changes.
     * The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      setNetworkStatus((prevStatus) => {
        if (
          event.origin === window.location.origin &&
          (event.data === 'online' || event.data === 'offline')
        ) {
          return event.data;
        }
        return prevStatus;
      });
    });

    return () => window.removeEventListener('message', () => {});
  }, []);

  useEffect(() => {
    if (authentication) {
      setLoading(true);
      getPersonType();
      if (networkStatus === 'online') {
        getWellnessStatus();
      }
    } else {
      // Clear out component's person-specific state when authentication becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setAnswered(null);
      setPersonType(null);
    }
    setLoading(false);
  }, [authentication, networkStatus]);

  const getWellnessStatus = async () => {
    const answer = await wellness.getStatus();

    if (answer.length > 0) {
      setAnswered(answer[0].answerValid);
    } else {
      setAnswered(false);
    }
  };

  const getPersonType = async () => {
    const profile = await user.getProfileInfo();
    console.log(profile);
    setPersonType(profile.PersonType);
  };

  if (!authentication) {
    // Show log in page when user is unauthenticated
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else if (loading) {
    return <GordonLoader />;
  } else if (networkStatus === 'online' && !answered) {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10} md={4}>
          <Question setAnswered={setAnswered} />
        </Grid>
      </Grid>
    );
  } else {
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
