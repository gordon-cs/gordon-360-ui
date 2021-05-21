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

const MemberList = ({ members, admin, createSnackbar }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < breakpointWidth);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < breakpointWidth);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  const compareByLastThenFirst = (a, b) => {
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
  ) : admin ? (
    <CardHeader
      title={
        <Grid container direction="row">
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={2}>
            Participation
          </Grid>
          <Grid item xs={3}>
            Title/Comment
          </Grid>
          <Grid item xs={2}>
            Mail #
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={4}>
            Name
          </Grid>
          <Grid item xs={4}>
            Participation
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
        {members.sort(compareByLastThenFirst).map((groupMember) => (
          <MemberListItem
            member={groupMember}
            key={groupMember.MembershipID}
            admin={admin}
            createSnackbar={createSnackbar}
            isMobileView={isMobileView}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberList;
