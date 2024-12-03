import { Grid, Typography, Box, AppBar, Breadcrumbs, Button } from '@mui/material';
import { Link as LinkRouter, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {
  NavigateNext as NavigateNextIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';
import styles from './Header.module.css';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import { CampusSafetyRoutes } from 'views/CampusSafety';

// Define the props for CampusSafetyBreadcrumb
type CampusSafetyBreadcrumbProps = {
  link: string | null;
  children: React.ReactNode;
};

const LostAndFoundBreadcrumb: React.FC<CampusSafetyBreadcrumbProps> = ({ link, children }) => {
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
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  // const isAdmin = true; //FOR TESTING ONLY
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);

  const formatPathnameSubstring = (substring: string) => {
    // Find the path in the routes corresponding to the current peice of the path.
    const origRoutes = Object.keys(CampusSafetyRoutes);
    const routes = Object.keys(CampusSafetyRoutes);

    let indexToGet;
    let formattedName;
    if (isNaN(parseInt(substring))) {
      let searchString: string;
      searchString = substring;
      // Find the route ending with the substring
      indexToGet = routes.findIndex((value) => {
        return value.split('/').slice(-1)[0] === searchString;
      });
      // Get the formatted name from the routes.
      formattedName = CampusSafetyRoutes[origRoutes[indexToGet]]?.formattedName;
    } else if (pathname.includes('admin')) {
      formattedName =
        CampusSafetyRoutes['/lostandfoundadmin/missingitemdatabase/:itemId'].formattedName;
    } else {
      formattedName = CampusSafetyRoutes['/:itemId'].formattedName;
    }

    if (formattedName) {
      formattedName = formattedName.replace('~', substring);
      return formattedName;
    }
    return substring;
  };

  return (
    <>
      <Grid container alignItems="center" columnSpacing={1} className={styles.headerMain}>
        <Grid item container xs={7}>
          <Grid item xs={12}>
            <Typography className={styles.title}>
              <Box component="span" sx={{ color: 'secondary.main' }}>
                Gordon
              </Box>{' '}
              Lost and Found
            </Typography>
          </Grid>
        </Grid>
        {(isAdmin || isKiosk) &&
          !pathnames.find((x) => x.toLowerCase() === 'lostandfoundadmin') && (
            <Grid item xs={5} className={styles.buttonContainer}>
              <Button
                color="secondary"
                className={styles.button}
                variant="contained"
                onClick={() => {
                  navigate('/lostandfound/lostandfoundadmin');
                }}
              >
                <AdminPanelSettingsIcon sx={{ marginRight: '0.3rem' }} />
                <b>Lost & Found Admin</b>
              </Button>
            </Grid>
          )}
      </Grid>
      <AppBar className={styles.stickyNav}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" className={styles.breadcrumbSeparator} />}
          className={styles.breadcrumbContainer}
        >
          {/* Home breadcrumb */}
          <LostAndFoundBreadcrumb link={pathnames.length > 1 ? '/lostandfound' : null}>
            <Grid container alignItems="center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {'Lost And Found Home'}
            </Grid>
          </LostAndFoundBreadcrumb>
          {/* Only render additional breadcrumbs beyond "Lost And Found Home" */}
          {pathnames
            .slice(1) // Start from the second item to avoid redundancy
            .map((value, index) => {
              const isLast = index === pathnames.length - 2;
              const to = `/${pathnames.slice(0, index + 2).join('/')}`;

              return (
                <LostAndFoundBreadcrumb key={to} link={!isLast ? to : null}>
                  {formatPathnameSubstring(value)}
                </LostAndFoundBreadcrumb>
              );
            })}
        </Breadcrumbs>
      </AppBar>
    </>
  );
};

export default Header;
