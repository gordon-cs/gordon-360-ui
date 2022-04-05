import { Grid } from '@material-ui/core';
import GordonLogoVerticalWhite from './gordon-logo-vertical-white.svg';
import styles from './LoginDialogue.module.css';

// TODO: Eventually abstract this out to be a global login component to be called anywhere
const LoginDialogue = () => {
  return (
    <Grid container direction="column" className={styles.loginDialogue}>
      <img className={styles.login_img} src={GordonLogoVerticalWhite} alt="Gordon Logo" />
    </Grid>
  );
};
export default LoginDialogue;
