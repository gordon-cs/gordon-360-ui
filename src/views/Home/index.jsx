// @TODO CSSMODULES - moved to global styles until a better solution is found
import { Grid } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
import LostAndFoundCard from './components/LostAndFoundCard';
import DaysLeft from './components/DaysLeft';
import PosterSwiper from './components/PosterSwiper';
import Stack from '@mui/material/Stack';
import RegistrationDate from './components/RegistrationDate';
import { isStudent as checkIsStudent } from 'services/user';

const Home = () => {
  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GuestWelcome />;
  } else {
    const isStudent = checkIsStudent(profile);

    return (
      <div>
        <PosterSwiper />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <DaysLeft />
          </Grid>
          <Grid item xs={12} md={5}>
            <DiningBalance />
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <LostAndFoundCard />
              <NewsCard />
              {isStudent && <RegistrationDate />}
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10}>
          <DaysLeft />
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <NewsCard />
            <LostAndFoundCard />
          </Stack>
        </Grid>
      </div>
    );
  }
};

export default Home;
