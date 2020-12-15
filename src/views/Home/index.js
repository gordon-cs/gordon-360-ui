import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import GordonLoader from '../../components/Loader';
import WellnessQuestion from '../../components/WellnessQuestion';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import NewsCard from './components/NewsCard';
import user from '../../services/user';
import wellness from '../../services/wellness';
import Login from '../Login';
import './home.css';
import { useNetworkStatus } from '../../context/NetworkContext';

const Home = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [personType, setPersonType] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(null);
  const networkStatus = useNetworkStatus();

  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      // Clear out component's person-specific state when authentication becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setHasAnswered(null);
      setPersonType(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authentication]);

  const loadPage = async () => {
    setLoading(true);
    const [{ PersonType }, { IsValid }] = await Promise.all([
      user.getProfileInfo(),
      wellness.getStatus(),
    ]);
    setPersonType(PersonType);
    setHasAnswered(IsValid);
    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else if (networkStatus === 'online' && !hasAnswered) {
    return <WellnessQuestion setStatus={() => setHasAnswered(true)} />;
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
