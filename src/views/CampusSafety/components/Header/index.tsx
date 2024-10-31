import { Grid, Typography, Box, AppBar, Breadcrumbs } from '@mui/material';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './Header.module.css';

// Define the props for CampusSafetyBreadcrumb
type CampusSafetyBreadcrumbProps = {
  link: string | null;
  children: React.ReactNode;
};

const CampusSafetyBreadcrumb: React.FC<CampusSafetyBreadcrumbProps> = ({ link, children }) => {
  return link ? (
    <LinkRouter to={link} className={`${styles.breadcrumbText} ${styles.breadcrumbLink}`}>
      {children}
    </LinkRouter>
  ) : (
    <Typography color="text.primary" className={styles.breadcrumbText}>
      {children}
    </Typography>
  );
};

// Define the props for Header
type HeaderProps = {
  safetyPage?: boolean;
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ safetyPage = true, children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (safetyPage) {
    return (
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
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
            className={styles.breadcrumbContainer}
          >
            {/* Home breadcrumb */}
            <CampusSafetyBreadcrumb link={pathnames.length > 0 ? '/campussafety' : null}>
              <Grid container alignItems="center">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {'Campus Safety Home'}
              </Grid>
            </CampusSafetyBreadcrumb>

            {/* Only render additional breadcrumbs beyond "Campus Safety Home" */}
            {pathnames
              .slice(1) // Start from the second item to avoid redundancy
              .map((value, index) => {
                const isLast = index === pathnames.length - 2;
                const to = `/${pathnames.slice(0, index + 2).join('/')}`;

                return (
                  <CampusSafetyBreadcrumb key={to} link={!isLast ? to : null}>
                    {value.replace(/-/g, ' ')}
                  </CampusSafetyBreadcrumb>
                );
              })}
          </Breadcrumbs>
        </AppBar>
      </>
    );
  }

  // Fallback for non-safety pages with children content
  return <>{children || null}</>;
};

export default Header;
