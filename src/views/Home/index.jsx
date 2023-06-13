// @TODO CSSMODULES - moved to global styles until a better solution is found
// import styles from './Home.module.css';
import { Grid } from '@mui/material';
import GordonLoader from 'components/Loader';
import WellnessQuestion from 'components/WellnessQuestion';
import { useUser } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import wellness from 'services/wellness';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';

import { theme } from '../../theme';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [hasAnswered, setHasAnswered] = useState(null);
  const isOnline = useNetworkStatus();
  const { profile, loading: loadingProfile } = useUser();

  const ModeSwitcher = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    console.log(theme.vars);

    useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return null;
    }
    return (
      <button
        variant="outlined"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? 'Dark' : 'Light'}
      </button>
    );
  };

  useEffect(() => {
    if (profile) {
      setLoading(true);
      wellness.getStatus().then(({ IsValid }) => {
        setLoading(false);
        setHasAnswered(IsValid);
      });
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setHasAnswered(null);
      setLoading(false);
    }
  }, [profile]);

  if (loading || loadingProfile) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GuestWelcome />;
  } else if (isOnline && !hasAnswered) {
    return <WellnessQuestion setStatus={() => setHasAnswered(true)} />;
  } else {
    const doughnut = profile?.PersonType?.includes('stu') ? <CLWCreditsDaysLeft /> : <DaysLeft />;

    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <ModeSwitcher />
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
