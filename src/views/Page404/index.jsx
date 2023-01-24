import { Typography, Grid } from '@mui/material';
import mascot from './mascot.svg';
import ScottieDog from './components/ScottieDog';

const message = "Hmmm... We're not quite sure what you're looking for";

const styles2 = {
  main: {
    height: 'calc(100vh - 72px)',
    margin: '-16px 0px',
    position: 'relative',
  },
  message: {
    padding: '20px',
    maxWidth: '700px',
    fontSize: 'calc(1vw + 1.5em)',
  },
  image: {
    height: '60%',
  },
  mascot: {
    height: '100%',
    maxWidth: '90vw',
  },
};

const Page404 = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      direction="column"
      style={styles2.main}
    >
      {/* 404 message */}
      <Grid item style={styles2.message}>
        <Typography
          variant="h4"
          align="center"
          style={{
            fontSize: 'calc(0.2vw + 0.8em)',
            color: 'rgba(0, 0, 0, 0.54)',
            fontWeight: 'bold',
          }}
        >
          {message}
        </Typography>
      </Grid>
      {/* Gordon mascot image */}
      <Grid item align="center" style={styles2.image}>
        <img src={mascot} alt="Gordon Mascot" style={styles2.mascot}></img>
      </Grid>
      {/* Scottie dog walking across bottom animation */}
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          height: '100px',
          width: '100%',
          fontSize: '15px',
        }}
      >
        <ScottieDog></ScottieDog>
      </div>
    </Grid>
  );
};

export default Page404;
