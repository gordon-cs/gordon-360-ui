import { Grid } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
import LostAndFoundCard from './components/LostAndFoundCard';
import DaysLeft from './components/DaysLeft';
import Stack from '@mui/material/Stack';
import RegistrationDate from './components/RegistrationDate';

const Home = () => {
  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GuestWelcome />;
  } else {
    return (
      <div>
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
              <RegistrationDate />
            </Stack>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Home;
