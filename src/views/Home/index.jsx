// @TODO CSSMODULES - moved to global styles until a better solution is found
// import styles from './Home.module.css';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import Carousel from './components/Carousel';
import DiningBalance from './components/DiningBalance';
import GuestWelcome from './components/GuestWelcome';
import NewsCard from './components/NewsCard';
import LostAndFoundCard from './components/LostAndFoundCard';
import DaysLeft from './components/DaysLeft';
import Stack from '@mui/material/Stack';

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
        {/* Add pull-down iframe below DaysLeft */}
        <Grid item xs={12} md={10}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Dining Menu</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <iframe
                src="https://www.nutritics.com/menu/ma4080"
                width="100%"
                height="700"
                style={{ border: 'none' }}
                title="Nutritics Menu"
              ></iframe>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <LostAndFoundCard />
            <NewsCard />
          </Stack>
        </Grid>
      </Grid>
    );
  }
};

export default Home;
