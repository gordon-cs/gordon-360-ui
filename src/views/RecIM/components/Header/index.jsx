import { Grid, AppBar, Breadcrumbs, Typography, useMediaQuery } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import styles from './Header.module.css';
import HomeIcon from '@mui/icons-material/Home';
import { windowBreakWidths } from 'theme';

const RecIMBreadcrumb = ({ link, children }) => {
  if (link) {
    return (
      <LinkRouter
        className={`${styles.breadcrumbText} gc360_text_link`}
        underline="hover"
        color="inherit"
        to={link}
      >
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

const truncate = (str) => {
  return str.length > 10 ? str.substring(0, 5) + '...' : str;
};

const Header = ({ match, team, activity, admin, children }) => {
  const largeWidth = useMediaQuery(`(min-width: ${windowBreakWidths.breakSM}px)`);
  console.log(match);
  return (
    <>
      {children && <Grid className={styles.mainHeader}>{children}</Grid>}
      <AppBar className={styles.stickyNav} sx={!children && { mt: '-1rem' }}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* Home breadcrumb */}
          <RecIMBreadcrumb link={(activity || team || match || admin) && `/recim`}>
            <Grid container alignItems="center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {largeWidth && 'Rec-IM Home'}
            </Grid>
          </RecIMBreadcrumb>
          {/* Activity breadcrumb */}
          {(activity || team || match) && (
            <RecIMBreadcrumb
              link={(team || match) && `/recim/activity/${team?.Activity.ID ?? match?.Activity.ID}`}
            >
              {activity?.Name ?? team?.Activity.Name ?? match?.Activity.Name}
            </RecIMBreadcrumb>
          )}
          {/* Team breadcrumb */}
          {team && <RecIMBreadcrumb>{team.Name}</RecIMBreadcrumb>}
          {/* Match breadcrumb */}
          {match && (
            <RecIMBreadcrumb>
              {largeWidth
                ? `Match: ${match?.Team[0]?.Name ?? 'TBD'} vs 
              ${match?.Team[1]?.Name ?? 'TBD'}`
                : `Match: ${truncate(match?.Team[0]?.Name ?? 'TBD')} vs ${truncate(
                    match?.Team[1]?.Name ?? 'TBD',
                  )}`}
            </RecIMBreadcrumb>
          )}
          {/* Admin breadcrumb */}
          {admin && <RecIMBreadcrumb>Admin</RecIMBreadcrumb>}
        </Breadcrumbs>
      </AppBar>
    </>
  );
};

export default Header;
