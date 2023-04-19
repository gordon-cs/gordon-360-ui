import { Grid, Typography, Tabs, Tab, Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ActivityListing,
  MatchListing,
  ParticipantListing,
  SurfaceListing,
  TeamListing,
  SportListing,
} from './Listing';
import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';
import { getFullDate, standardDate } from '../Helpers';
import { TabPanel } from '../TabPanel';

const ActivityList = ({ activities, showActivityOptions }) => {
  if (!activities?.length)
    return <Typography className={styles.secondaryText}>No activities to show.</Typography>;
  let content = activities.map((activity) => (
    <ActivityListing
      key={activity.ID}
      activity={activity}
      showActivityOptions={showActivityOptions}
    />
  ));
  return <List dense>{content}</List>;
};

const ParticipantList = ({
  participants,
  minimal,
  showParticipantOptions,
  withAttendance,
  attendance,
  isAdmin,
  matchID,
  teamID,
  showInactive,
  callbackFunction,
}) => {
  if (!participants?.length)
    return <Typography className={styles.secondaryText}>No participants to show.</Typography>;
  let content = participants.map((participant) => {
    if (!showInactive && participant.Role === 'Inactive') {
      return null;
    }
    return (
      <ParticipantListing
        key={participant.username}
        participant={participant}
        minimal={minimal}
        withAttendance={withAttendance}
        initialAttendance={
          withAttendance && attendance?.find((att) => att.Username === participant.Username)
        }
        isAdmin={isAdmin}
        matchID={matchID}
        teamID={teamID}
        callbackFunction={(bool) => callbackFunction(bool)}
        showParticipantOptions={
          showParticipantOptions &&
          participant.Role !== 'Team-captain/Creator' &&
          participant.Role !== 'Requested Join' // don't promote people who haven't joined
        }
      />
    );
  });
  return <List dense>{content}</List>;
};

const MatchList = ({ matches, activityID }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  useEffect(() => {
    let now = getFullDate(new Date().toJSON());
    let index = organizedMatches.findIndex((day) => day.FullDate === now);
    if (index !== -1) setSelectedDay(index);
  }, []);

  if (!matches?.length || !matches[0])
    return <Typography className={styles.secondaryText}>No matches to show.</Typography>;

  let firstDate = standardDate(matches[0].StartTime, false, true);
  let firstFullDate = getFullDate(matches[0].StartTime);
  let organizedMatches = [
    {
      FullDate: firstFullDate,
      DayOfWeek: firstDate.slice(0, 3),
      DayOnly: firstDate.slice(4),
      Matches: [],
    },
  ];

  let j = 0;
  matches.forEach((m) => {
    let date = standardDate(m.StartTime, false, true);
    let fullDate = getFullDate(m.StartTime);
    if (organizedMatches[j].DayOnly === date.slice(4)) organizedMatches[j].Matches.push(m);
    else {
      organizedMatches.push({
        FullDate: fullDate,
        DayOfWeek: date.slice(0, 3),
        DayOnly: date.slice(4),
        Matches: [m],
      });
      j++;
    }
  });

  organizedMatches.sort((a, b) => a.FullDate > b.FullDate);

  let matchTabs = (
    <>
      <Box className={styles.scrollableCenteredTabs}>
        <Tabs
          scrollButtons
          allowScrollButtonsMobile
          value={selectedDay}
          onChange={(event, tabIndex) => setSelectedDay(tabIndex)}
          variant="scrollable"
          aria-label="admin control center tabs"
        >
          {organizedMatches.map((day) => {
            return (
              <Tab
                label={
                  <Grid>
                    <Typography sx={{ fontSize: '1em' }}>{day.DayOfWeek}</Typography>
                    <Typography sx={{ fontSize: '0.8em' }}>{day.DayOnly}</Typography>
                  </Grid>
                }
              />
            );
          })}
        </Tabs>
      </Box>

      {organizedMatches.map((day, index) => {
        return (
          <TabPanel value={selectedDay} index={index}>
            <List dense>
              {day.Matches.map((match) => (
                <MatchListing key={match?.ID} match={match} activityID={activityID} />
              ))}
            </List>
          </TabPanel>
        );
      })}
    </>
  );
  return matchTabs;
};

// setTargetTeamID is used for edit Match teams
const TeamList = ({ teams, match, series, invite, setInvites, setTargetTeamID }) => {
  const navigate = useNavigate();

  if (!teams?.length && !match && !series)
    return <Typography className={styles.secondaryText}>No teams to show.</Typography>;

  const handleInviteResponse = (response, activityID, teamID) => {
    if (response === 'accepted') {
      navigate(`activity/${activityID}/team/${teamID}`);
    } else if (response === 'rejected') {
      setInvites(teams.filter((team) => team.ID !== teamID));
    }
  };

  if (series) {
    teams = [];
    /**
     * sort by:
     * 1) wins
     * 2) reverse losses
     * 3) sportsmanship
     */
    var teamStanding = series.TeamStanding.sort((a, b) => {
      if (a.WinCount > b.WinCount) return -1;
      if (a.WinCount == b.WinCount) {
        if (a.LossCount < b.LossCount) return -1;
        if (a.LossCount == b.LossCount) {
          if (a.SportsmanshipRating > b.SportsmanshipRating) return -1;
          //spot for more tiebreakers if customer desires
        }
      }
      return 1;
    });
    teamStanding.forEach((team) => {
      teams.push({
        ID: team.TeamID,
        Logo: team.Logo,
        Name: team.Name,
        Activity: {
          ID: series.ActivityID,
        },
        TeamRecord: [
          {
            WinCount: team.WinCount,
            LossCount: team.LossCount,
            TieCount: team.TieCount,
            SportsmanshipRating: team.SportsmanshipRating ?? 5,
          },
        ],
      });
    });
  }

  let content = match
    ? match.Team.map((team) => (
        <TeamListing key={team.ID} team={team} match={match} setTargetTeamID={setTargetTeamID} />
      ))
    : teams.map((team) => (
        <TeamListing
          key={team.ID}
          team={team}
          invite={invite ?? false}
          callbackFunction={handleInviteResponse}
        />
      ));
  return <List dense>{content}</List>;
};

const SportList = ({ sports, confirmDelete, editDetails }) => {
  if (!sports?.length)
    return <Typography className={styles.secondaryText}>No sports to show.</Typography>;
  let content = sports.map((sport) => (
    <SportListing sport={sport} confirmDelete={confirmDelete} editDetails={editDetails} />
  ));
  return <List dense>{content}</List>;
};

const SurfaceList = ({ surfaces, confirmDelete, editDetails }) => {
  if (!surfaces?.length)
    return <Typography className={styles.secondaryText}>No surfaces to show.</Typography>;
  let content = surfaces.map((surface) => (
    <SurfaceListing surface={surface} confirmDelete={confirmDelete} editDetails={editDetails} />
  ));
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList, SurfaceList, SportList };
