import { Typography, Grid } from '@mui/material';
import mascot from './mascot.svg';
import ScottieDog from './components/ScottieDog';
import styles from './Page404.module.css';
const message_line_1 = "Hmmm... We're not quite sure";
const message_line_2 = "what you're looking for";

const Page404 = (props) => {
  let messageLines = props.messages ?? [message_line_1, message_line_2]

  return (
    <Grid container className={styles.page404_main}>
      {/* 404 message */}
      <Grid item className={styles.page404_message}>
        {messageLines.map((msg) =>
          <Typography variant="h4" className={styles.page404_title}>
            {msg}
          </Typography>
        )}
      </Grid>
      {/* Gordon mascot image */}
      <Grid item align="center" className={styles.page404_image}>
        <img src={mascot} alt="Gordon Mascot" className={styles.page404_mascot}></img>
      </Grid>
      {/* Scottie dog walking across bottom animation */}
      <div className={styles.page404_walk_animation}>
        <ScottieDog></ScottieDog>
      </div>
    </Grid>
  );
};

export default Page404;
