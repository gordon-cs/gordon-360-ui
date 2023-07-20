import { Grid, Typography, Tabs, Tab, Box, List } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import {
  ActivityListing,
  MatchListing,
  ParticipantListing,
  SurfaceListing,
  TeamListing,
  SportListing,
  MatchHistoryListing,
  ExpandableTeamListing,
} from './Listing';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './List.module.css';
import { getFullDate, standardDate } from '../Helpers';
import { TabPanel } from '../TabPanel';
import { addDays } from 'date-fns';
import { editTeamParticipant, respondToTeamInvite } from 'services/recim/team';

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
  isAdminPage,
  editDetails,
  showParticipantOptions,
  withAttendance,
  attendance,
  isAdmin,
  matchID,
  teamID,
  showInactive,
  callbackFunction,
}) => {
  // callback to remove current captain
  const promoteNewCaptain = async (newCaptainUsername) => {
    let currentCaptain = participants.find((p) => p.Role === 'Team-captain/Creator').Username;
    await editTeamParticipant(teamID, { Username: newCaptainUsername, RoleTypeID: 5 }); //captain
    await editTeamParticipant(teamID, { Username: currentCaptain, RoleTypeID: 3 }); //member
    callbackFunction((r) => !r);
  };

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
        isAdminPage={isAdminPage}
        editParticipantInfo={editDetails}
        withAttendance={withAttendance}
        initialAttendance={
          withAttendance && attendance?.find((att) => att.Username === participant.Username)
        }
        isAdmin={isAdmin}
        matchID={matchID}
        teamID={teamID}
        makeNewCaptain={(username) => promoteNewCaptain(username)}
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

const MatchList = ({ matches = [], activityID }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  let firstDate = matches[0] ? standardDate(matches[0].StartTime, false, true) : null;
  let firstFullDate = matches[0] ? getFullDate(matches[0].StartTime) : null;
  let organizedMatches = useMemo(
    () => [
      {
        FullDate: firstFullDate,
        DayOfWeek: firstDate?.slice(0, 3),
        DayOnly: firstDate?.slice(4),
        Matches: [],
      },
    ],
    [firstDate, firstFullDate],
  );

  useEffect(() => {
    let now = new Date();
    const today = getFullDate(now.toJSON());
    let index = organizedMatches.findIndex((day) => day.FullDate === today);
    if (index === -1)
      for (let i = 1; i < 8; i++) {
        now = addDays(now, i);
        const nextDay = getFullDate(now.toJSON());
        index = organizedMatches.findIndex((day) => day.FullDate === nextDay);
        if (index !== -1) {
          setSelectedDay(index);
          break;
        }
      }
    else setSelectedDay(index);
  }, [organizedMatches]);

  if (!matches?.length || !matches[0])
    return <Typography className={styles.secondaryText}>No matches to show.</Typography>;

  organizedMatches = [
    {
      FullDate: firstFullDate,
      DayOfWeek: firstDate?.slice(0, 3),
      DayOnly: firstDate?.slice(4),
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

  return organizedMatches.length === 1 ? (
    <List dense>
      {organizedMatches[0].Matches.map((match) => (
        <MatchListing key={match?.ID} match={match} activityID={activityID} />
      ))}
    </List>
  ) : (
    matchTabs
  );
};

const MatchHistoryList = ({ matches, activityID }) => {
  return matches?.length > 0 ? (
    <List dense>
      {matches.map((match) => (
        <MatchHistoryListing key={match?.MatchID} match={match} activityID={activityID} />
      ))}
    </List>
  ) : (
    <Typography className={styles.secondaryText}>Team hasn't played any matches.</Typography>
  );
};

/**
 * Currently used in Match page to render multiple
 * Teams that can expand into participantLists
 */
const ExpandableTeamList = ({ teams, teamScores, attendance, activityID, isAdmin }) => {
  if (!teams?.length)
    return <Typography className={styles.secondaryText}>No teams to show.</Typography>;

  /**
   * sort by score then by sportsmanship
   */
  let formattedTeams = [];

  teams.sort((a, b) => {
    let aScore = teamScores.find((ts) => ts.TeamID === a.ID);
    let bScore = teamScores.find((ts) => ts.TeamID === b.ID);
    if (aScore.TeamScore > bScore.TeamScore) return -1;
    if (aScore.TeamScore === bScore.TeamScore)
      if (aScore.SportsmanshipScore > bScore.SportsmanshipScore) return -1;
    return 1;
  });
  let ranking = 1;
  teams.forEach((team) => {
    formattedTeams.push({
      ...team,
      ...{
        Ranking: ranking,
        ActivityID: activityID,
      },
    });
    ranking++;
  });

  return (
    <List dense>
      {formattedTeams.map((team) => (
        <ExpandableTeamListing
          key={team.ID}
          team={team}
          teamScore={teamScores.find((score) => score.TeamID === team.ID)}
          attendance={attendance.find((att) => att.TeamID === team.ID)}
          isAdmin={isAdmin}
        />
      ))}
    </List>
  );
};

// setTargetTeamID is used for edit Match teams
const TeamList = ({
  participant,
  teams,
  match,
  series,
  invite,
  setInvites,
  setTargetTeamID,
  setOpenWaiver,
}) => {
  const navigate = useNavigate();

  if (!teams?.length && !match && !series)
    return <Typography className={styles.secondaryText}>No teams to show.</Typography>;

  const handleInviteResponse = async (response, activityID, teamID) => {
    if (response === 'accepted') {
      if (participant?.Status == 'Pending' || participant == null) {
        setOpenWaiver(true);
      } else {
        await respondToTeamInvite(teamID, response);
        navigate(`activity/${activityID}/team/${teamID}`);
      }
    } else if (response === 'rejected') {
      await respondToTeamInvite(teamID, response);
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

export {
  ActivityList,
  ParticipantList,
  MatchList,
  MatchHistoryList,
  ExpandableTeamList,
  TeamList,
  SurfaceList,
  SportList,
};
