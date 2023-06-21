import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useWindowSize } from 'hooks';
import MemberListItem from './components/MemberListItem';
import styles from './MemberList.module.css';

const breakpointWidth = 810;

const headerStyle = {
  padding: '10px',
};
const MemberList = ({
  members,
  isAdmin,
  isSiteAdmin,
  createSnackbar,
  onLeave,
  onToggleIsAdmin,
}) => {
  const [width] = useWindowSize();
  const isMobileView = width < breakpointWidth;

  /**
   * Compares two members by their role and then their names - last then first
   *
   * Roles follow this hierarchy: Advisor > Leader > Member > Guest
   *
   * @param {Object} a the first member to compare
   * @param {Object} b the second member to compare
   * @returns {number} the sort order of the members: -1 if a before b, 1 if b before a, or 0 if equal
   */

  const compareByRoleThenLastThenFirst = (a, b) => {
    if (a.ParticipationDescription !== b.ParticipationDescription) {
      if (a.ParticipationDescription === 'Advisor') return -1;
      if (b.ParticipationDescription === 'Advisor') return 1;
      if (a.ParticipationDescription === 'Leader') return -1;
      if (b.ParticipationDescription === 'Leader') return 1;
      if (a.ParticipationDescription === 'Member') return -1;
      if (b.ParticipationDescription === 'Member') return 1;
    }

    if (a.LastName.toUpperCase() < b.LastName.toUpperCase()) {
      return -1;
    }
    if (a.LastName.toUpperCase() > b.LastName.toUpperCase()) {
      return 1;
    }
    if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {
      return -1;
    }
    if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) {
      return 1;
    }
    return 0;
  };

  const header = isMobileView ? (
    <CardHeader title="Members" style={headerStyle} className={styles.MemberList_headerStyle} />
  ) : isAdmin || isSiteAdmin ? (
    <CardHeader
      title={
        <Grid container direction="row">
          <Grid item xs={1} />
          <Grid item xs={3}>
            Full Name
          </Grid>
          <Grid item xs={4}>
            Title/Participation
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2}>
            Admin
          </Grid>
        </Grid>
      }
      titleTypographyProps={{ variant: 'h6' }}
      style={headerStyle}
      className={styles.MemberList_headerStyle}
    />
  ) : (
    <CardHeader
      title={
        <Grid container direction="row">
          <Grid item xs={1} />
          <Grid item xs={5}>
            Name
          </Grid>
          <Grid item xs={6}>
            Title/Participation
          </Grid>
        </Grid>
      }
      style={headerStyle}
      className={styles.MemberList_headerStyle}
    />
  );
  return (
    <Card>
      {header}
      <CardContent>
        {members.sort(compareByRoleThenLastThenFirst).map((member) => (
          <MemberListItem
            member={member}
            key={member.MembershipID}
            isAdmin={isAdmin}
            isSiteAdmin={isSiteAdmin}
            createSnackbar={createSnackbar}
            isMobileView={isMobileView}
            onLeave={onLeave}
            onToggleIsAdmin={onToggleIsAdmin}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberList;
