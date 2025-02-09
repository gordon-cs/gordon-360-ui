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

const pathSubstringToFormattedName = (substring: string, pathnames: string[]) => {
  // Get the formatted name for this breadcrumb from the routes object.
  let formattedName = '';
  if (substring) {
    // Get index of current substring in the current route
    const PathSubstringIndex = pathnames.findIndex((x) => x === substring);
    let breadcrumbRoute;
    if (!isNaN(parseInt(substring))) {
      // If substring is a number, replace number with dynamic route param :itemId
      breadcrumbRoute = '';
      if (PathSubstringIndex !== 1) {
        // Start route with / if substring isn't first element in the route
        // Prevents doubling // when adding "/:itemId" to the route on the next line
        breadcrumbRoute += '/';
      }
      breadcrumbRoute += pathnames.slice(1, PathSubstringIndex).join('/') + '/:itemId';
    } else {
      breadcrumbRoute = '/' + pathnames.slice(1, PathSubstringIndex + 1).join('/');
    }

    // Find the formatted name in the routes object
    formattedName = CampusSafetyRoutes[breadcrumbRoute].formattedName;

    let queryString = '';
    if (CampusSafetyRoutes[breadcrumbRoute].queryString) {
      queryString += CampusSafetyRoutes[breadcrumbRoute].queryString;
    }

    if (formattedName) {
      formattedName = formattedName.replace('~', substring);
      return [formattedName, queryString];
    }
    return [substring, ''];
  }
  return ['', ''];
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);

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
        {(isAdmin || isKiosk || isDev) &&
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
            .map((value, indexPos) => {
              // Being the last breadcrumb means current page, so doesn't link anywhere
              const isLast = indexPos === pathnames.length - 2;
              // Build the url up to this location in the breadcrumb
              const to = `/${pathnames.slice(0, indexPos + 2).join('/')}`;
              const [formattedName, queryString] = pathSubstringToFormattedName(value, pathnames);
              return (
                <LostAndFoundBreadcrumb key={to} link={!isLast ? to + queryString : null}>
                  {formattedName}
                </LostAndFoundBreadcrumb>
              );
            })}
        </Breadcrumbs>
      </AppBar>
    </>
  );
};

export default Header;
