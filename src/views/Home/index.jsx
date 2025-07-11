// @TODO CSSMODULES - moved to global styles until a better solution is found
// import styles from './Home.module.css';
import { Grid } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import Carousel from './components/Carousel';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
import LostAndFoundCard from './components/LostAndFoundCard';
import DaysLeft from './components/DaysLeft';
import Stack from '@mui/material/Stack';
import DailyDigest from './components/DailyDigest';

const Home = () => {
  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GuestWelcome />;
  } else {
    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={10}>
          <DaysLeft />
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <DailyDigest />
            <NewsCard />
            <LostAndFoundCard />
          </Stack>
        </Grid>
      </Grid>
    );
  }
};

export default Home;
