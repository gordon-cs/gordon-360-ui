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
  ) : isAdmin || isSuperAdmin ? (
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
  /// function that re-arrange names alpabetically and also by Advisor, Leader, members and Guest
  // by Hierarchy.
  function sortByParticipation(memberArr) {
    let advisors = [];
    let leaders = [];
    let members = [];
    let guests = [];
    memberArr.map((member) => {
      if (member.ParticipationDescription === 'Member') {
        members.push(member);
      } else if (member.ParticipationDescription === 'Leader') {
        leaders.push(member);
      } else if (member.ParticipationDescription === 'Advisor') {
        advisors.push(member);
      } else if (member.ParticipationDescription === 'Guest') {
        guests.push(member);
      }
    });
    memberArr = [];
    advisors.map((advisor) => memberArr.push(advisor));
    leaders.map((leader) => memberArr.push(leader));
    members.map((member) => memberArr.push(member));
    guests.map((guest) => memberArr.push(guest));

    return memberArr;
  }

  return (
    <Card>
      {header}
      <CardContent>
        {sortByParticipation(members.sort(compareByLastThenFirst)).map((member) => (
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
