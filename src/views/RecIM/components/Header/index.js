import { Grid, AppBar, Breadcrumbs, Typography } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import styles from './Header.module.css';
import GordonLoader from 'components/Loader';
import HomeIcon from '@mui/icons-material/Home';

const RecIMBreadcrumb = ({ link, children }) => {
  if (link) {
    return (
      <LinkRouter className="gc360_text_link" underline="hover" color="inherit" to={link}>
        {children}
      </LinkRouter>
    );
  }
  return <Typography color="text.primary">{children}</Typography>;
};

const Header = ({ match, team, activity, admin, children }) => {
  return (
    <>
      {children && <Grid className={styles.mainHeader}>{children}</Grid>}
      <AppBar className={styles.stickyNav} sx={!children && { mt: '-1rem' }}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* Home breadcrumb */}
          <RecIMBreadcrumb link={(activity || team || match || admin) && `/recim`}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Rec-IM Home
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
              Match: {match?.Team[0]?.Name ?? <i>TBD</i>} vs {match?.Team[1]?.Name ?? <i>TBD</i>}
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
