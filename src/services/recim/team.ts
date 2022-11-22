import http from '../http';
import { match } from './match';
import { participant } from './participant';

export type team = {
  ID: number;
  Name: string;
  Status: string;
  Logo: string;
  Match: match[];
  Participant: participant[];
  MatchHistory: teamMatchHistory[];
  TeamRecord: teamRecord[];
};

type teamMatchHistory = {
  MatchID: number;
  Opponent: team;
  OwnScore: number;
  OpposingScore: number;
  Status: string;
  MatchStatusID: number;
  Time: string;
};

export type teamRecord = {
  ID: number;
  Name: string;
  Win: number;
  Loss: number;
  Tie: number;
};

type uploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

type patchTeam = {
  Name: string;
  StatusID: number;
  Logo: string;
};

//Team Routes
const createTeam = async (username: string, newTeam: uploadTeam): Promise<Object[]> => {
  return await http.post(`recim/teams?captain=${username}`, newTeam);
};

const getTeamByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/teams/${ID}`);
};

const addParticipantToTeam = async (username: string, teamID: number): Promise<Object[]> => {
  return await http.post(
    `recim/teams/participants?participantUsername=${username}&teamID=${teamID}`,
  );
};

const editTeam = async (ID: number, updatedTeam: patchTeam): Promise<Object[]> => {
  return await http.patch(`recim/teams/${ID}`, updatedTeam);
};

export { createTeam, getTeamByID, addParticipantToTeam, editTeam };
