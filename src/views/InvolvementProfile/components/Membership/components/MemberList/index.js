import React, { useEffect, useState } from 'react';

import { gordonColors } from 'theme';

import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import MemberListItem from './components/MemberListItem';

const breakpointWidth = 810;

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
  padding: '10px',
};

const MemberList = ({
  members,
  isAdmin,
  isSuperAdmin,
  createSnackbar,
  onLeave,
  onToggleIsAdmin,
}) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < breakpointWidth);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < breakpointWidth);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  /**
   * Compares two members by their role and then their names - last then first
   *
   * Roles follow this hierarchy: Advisor > Leader > Member > Guest
   * @param {Object} a the first member to compare
   * @param {Object} b the second member to compare
   * @returns {-1 | 0 | 1} the sort order of the members: -1 if a before b, 1 if b before a, or 0 if equal
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
    <CardHeader title="Members" style={headerStyle} />
  ) : isAdmin || isSuperAdmin ? (
    <CardHeader
      title={
        <Grid container direction="row">
          <Grid item xs={1} />
          <Grid item xs={3}>
            Name
          </Grid>
          <Grid item xs={4}>
            Title/Participation
          </Grid>
          <Grid item xs={2}>
            Mail #
          </Grid>
          <Grid item xs={2}>
            Admin
          </Grid>
        </Grid>
      }
      titleTypographyProps={{ variant: 'h6' }}
      style={headerStyle}
    />
  ) : (
    <CardHeader
      title={
        <Grid container direction="row">
          <Grid item xs={1} />
          <Grid item xs={3}>
            Name
          </Grid>
          <Grid item xs={4}>
            Title/Participation
          </Grid>
          <Grid item xs={4}>
            Mail #
          </Grid>
        </Grid>
      }
      style={headerStyle}
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
            isSuperAdmin={isSuperAdmin}
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
