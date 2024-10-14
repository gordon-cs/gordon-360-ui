import { Grid, Typography, Box } from '@mui/material';
import styles from './Header.module.css';

// Page header component, has a option for the safety page, and an option that holds any
// child element for other pages
const Header = ({ safetyPage }: { safetyPage: boolean }, children: JSX.Element | null) => {
  return safetyPage ? (
    <Grid container alignItems="center" columnSpacing={4} className={styles.headerMain}>
      <Grid item container xs={9} alignItems="center" columnSpacing={2}>
        <Grid item xs={8}>
          <Typography className={styles.title}>
            <Box component="span" sx={{ color: 'secondary.main' }}>
              Gordon
            </Box>{' '}
            Campus Safety Resources
          </Typography>
          <Typography className={styles.subtitle}>
            <i>"Helping students help themselves"</i>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    children && <Grid className={styles.mainHeader}>{children}</Grid>
  );
};

export default Header;
