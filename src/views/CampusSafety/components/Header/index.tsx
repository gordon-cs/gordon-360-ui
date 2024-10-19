import { Grid, Typography, Box, AppBar, Breadcrumbs } from '@mui/material';
import { Link as LinkRouter, Path, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import styles from './Header.module.css';

const CampusSafetyBreadcrumb = ({
  link,
  children,
}: {
  link: string | null;
  children: JSX.Element;
}) => {
  if (link) {
    return (
      <LinkRouter className={`${styles.breadcrumbText} gc360_text_link`} color="inherit" to={link}>
        {children}
      </LinkRouter>
    );
  }
  return (
    <Typography color="text.primary" className={styles.breadcrumbText}>
      {children}
    </Typography>
  );
};

// Page header component, has a option for the safety page, and an option that holds any
// child element for other pages
const Header = ({ safetyPage }: { safetyPage?: boolean }, children: JSX.Element | null) => {
  const location = useLocation().pathname;
  // console.log(typeof location);
  return safetyPage || safetyPage === undefined ? (
    <>
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
      <AppBar className={styles.stickyNav}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* Home breadcrumb */}
          <CampusSafetyBreadcrumb link={location !== '/campussafety' ? `/campussafety` : null}>
            <Grid container alignItems="center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {'Campus Safety Home'}
            </Grid>
          </CampusSafetyBreadcrumb>
        </Breadcrumbs>
      </AppBar>
    </>
  ) : (
    children && <Grid className={styles.mainHeader}>{children}</Grid>
  );
};

export default Header;
