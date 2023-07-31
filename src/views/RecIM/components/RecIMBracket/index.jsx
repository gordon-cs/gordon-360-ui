import { useState, useEffect } from 'react';
import { getBracketInfo } from 'services/recim/series';
import { Box } from '@mui/material';
import { standardDate } from '../Helpers';
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  MATCH_STATES,
  SVGViewer,
} from '@g-loot/react-tournament-brackets';
import { Link } from 'react-router-dom';
// import styles from './RecIMBracket.module.css';
import GordonLoader from 'components/Loader';
import { useWindowSize } from 'hooks';

const demo2 = [
  {
    id: 19874,
    name: 'Final - Match',
    nextMatchId: null,
    nextLooserMatchId: null,
    tournamentRoundText: '6',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19875,
    name: 'Semi Final - Match 1',
    nextMatchId: 19874,
    nextLooserMatchId: null,
    tournamentRoundText: '5',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19906,
    name: 'Semi Final - Match 2',
    nextMatchId: 19874,
    nextLooserMatchId: null,
    tournamentRoundText: '5',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19876,
    name: 'Round 4 - Match 1',
    nextMatchId: 19875,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: '059743f7-9501-471e-8f9e-2d1032eccc67',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'TestTeamz',
        picture: null,
      },
    ],
  },
  {
    id: 19891,
    name: 'Round 4 - Match 2',
    nextMatchId: 19875,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'adamamd',
        picture: null,
      },
    ],
  },
  {
    id: 19907,
    name: 'Round 4 - Match 3',
    nextMatchId: 19906,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test Post',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19922,
    name: 'Round 4 - Match 4',
    nextMatchId: 19906,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TESTWTF',
        picture: 'teamlogos/images_wstysk',
      },
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19877,
    name: 'Round 3 - Match 1',
    nextMatchId: 19876,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: 'acf45434-78a1-4907-bf19-92235d180e8b',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'omaromar',
        picture: null,
      },
    ],
  },
  {
    id: 19884,
    name: 'Round 3 - Match 2',
    nextMatchId: 19876,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test73',
        picture: null,
      },
      {
        id: '059743f7-9501-471e-8f9e-2d1032eccc67',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeamz',
        picture: null,
      },
    ],
  },
  {
    id: 19892,
    name: 'Round 3 - Match 3',
    nextMatchId: 19891,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '7eac0db4-2e53-4f42-a670-58847b1f5e4c',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test 1',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19899,
    name: 'Round 3 - Match 4',
    nextMatchId: 19891,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '9d13814a-81b9-43d1-b9f9-42da1fe22578',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'adam peleback',
        picture: 'teamlogos/G-Loot_Logo_Portrait_Green_Black128px_yhkf4w',
      },
      {
        id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adamamd',
        picture: null,
      },
    ],
  },
  {
    id: 19908,
    name: 'Round 3 - Match 5',
    nextMatchId: 19907,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test Post',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '02aae6b1-bd99-4469-9d5a-4a83019d7dbc',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test6000',
        picture: null,
      },
    ],
  },
  {
    id: 19915,
    name: 'Round 3 - Match 6',
    nextMatchId: 19907,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '390f872a-fe15-48a3-9283-4191ff4263e7',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test123',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19923,
    name: 'Round 3 - Match 7',
    nextMatchId: 19922,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'ad2a0a89-d3bb-49dd-b8fc-2ec100e33477',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Testing new Team',
        picture: null,
      },
      {
        id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TESTWTF',
        picture: 'teamlogos/images_wstysk',
      },
    ],
  },
  {
    id: 19930,
    name: 'Round 3 - Match 8',
    nextMatchId: 19922,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
      {
        id: '7fbd66f3-7eaa-4567-bc87-5a82f10417ad',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'adamapexnice',
        picture: null,
      },
    ],
  },
  {
    id: 19878,
    name: 'Round 2 - Match 1',
    nextMatchId: 19877,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'test9',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'Test of Tests',
        picture: null,
      },
    ],
  },
  {
    id: 19881,
    name: 'Round 2 - Match 2',
    nextMatchId: 19877,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'fdce979a-002e-4906-a80f-d161f108bcde',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'omar boi',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'acf45434-78a1-4907-bf19-92235d180e8b',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'omaromar',
        picture: null,
      },
    ],
  },
  {
    id: 19885,
    name: 'Round 2 - Match 3',
    nextMatchId: 19884,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '059743f7-9501-471e-8f9e-2d1032eccc67',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeamz',
        picture: null,
      },
      {
        id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test123',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19888,
    name: 'Round 2 - Match 4',
    nextMatchId: 19884,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test73',
        picture: null,
      },
      {
        id: 'ce914b1b-fe1e-4be9-8409-681049265614',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test5',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19893,
    name: 'Round 2 - Match 5',
    nextMatchId: 19892,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '43ddad56-5798-4364-bd5c-81ba2640e22a',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'testing',
        picture: null,
      },
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19896,
    name: 'Round 2 - Match 6',
    nextMatchId: 19892,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '7eac0db4-2e53-4f42-a670-58847b1f5e4c',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test 1',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '85568369-9f06-4098-be5f-1922e2ae61e5',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Testpubg',
        picture: null,
      },
    ],
  },
  {
    id: 19900,
    name: 'Round 2 - Match 7',
    nextMatchId: 19899,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '9d13814a-81b9-43d1-b9f9-42da1fe22578',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adam peleback',
        picture: 'teamlogos/G-Loot_Logo_Portrait_Green_Black128px_yhkf4w',
      },
      {
        id: '5b29528f-0dab-4dea-97d8-e6528b6cfc6c',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'glltest',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19903,
    name: 'Round 2 - Match 8',
    nextMatchId: 19899,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '8055f16b-3cc9-495a-b40a-2742712be6c6',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Adam testar',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adamamd',
        picture: null,
      },
    ],
  },
  {
    id: 19909,
    name: 'Round 2 - Match 9',
    nextMatchId: 19908,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '02aae6b1-bd99-4469-9d5a-4a83019d7dbc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test6000',
        picture: null,
      },
      {
        id: 'cb177e1d-6e6c-44b5-829a-45b699529274',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test50',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19912,
    name: 'Round 2 - Match 10',
    nextMatchId: 19908,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test Post',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'b4889d7a-5e25-4bae-aa4a-40776f44ef2d',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'omarapexnice',
        picture: null,
      },
    ],
  },
  {
    id: 19916,
    name: 'Round 2 - Match 11',
    nextMatchId: 19915,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '3a353047-4af3-4320-b2cf-2d83ddc9115a',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeamData',
        picture: null,
      },
      {
        id: '390f872a-fe15-48a3-9283-4191ff4263e7',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test123',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19919,
    name: 'Round 2 - Match 12',
    nextMatchId: 19915,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '4b5c9937-9e69-4e5b-8344-6a68d6c12a64',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test9',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19924,
    name: 'Round 2 - Match 13',
    nextMatchId: 19923,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TESTWTF',
        picture: 'teamlogos/images_wstysk',
      },
      {
        id: '0f8844f8-91a3-4969-9557-8ac560f3a7d2',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeam12344',
        picture: null,
      },
    ],
  },
  {
    id: 19927,
    name: 'Round 2 - Match 14',
    nextMatchId: 19923,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'ad2a0a89-d3bb-49dd-b8fc-2ec100e33477',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Testing new Team',
        picture: null,
      },
      {
        id: '613f708c-b000-4aa7-a9b1-47de355c9fac',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'testteam',
        picture: null,
      },
    ],
  },
  {
    id: 19931,
    name: 'Round 2 - Match 15',
    nextMatchId: 19930,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'b5edee08-6d0a-4e3d-9587-57a2d585e490',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Adam testar',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '7fbd66f3-7eaa-4567-bc87-5a82f10417ad',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adamapexnice',
        picture: null,
      },
    ],
  },
  {
    id: 19934,
    name: 'Round 2 - Match 16',
    nextMatchId: 19930,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
      {
        id: '3dce492c-ecad-453c-98e7-2b96ddbf8800',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'gloot3 test',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19879,
    name: 'Round 1 - Match 1',
    nextMatchId: 19878,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'bcbe20a3-82b5-4818-bb29-4c1149e9f04e',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'AdamsinLaDoncu',
        picture: 'teamlogos/px6aikyzeej5vhecturj',
      },
      {
        id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test of Tests',
        picture: null,
      },
    ],
  },
  {
    id: 19880,
    name: 'Round 1 - Match 2',
    nextMatchId: 19878,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '5acb196d-5f82-47f3-ae5a-2e87d070f610',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'testtesttetstst',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test9',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19882,
    name: 'Round 1 - Match 3',
    nextMatchId: 19881,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'acf45434-78a1-4907-bf19-92235d180e8b',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'omaromar',
        picture: null,
      },
      {
        id: 'be2db859-515f-4159-9051-6723d0b47eb7',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test3',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19883,
    name: 'Round 1 - Match 4',
    nextMatchId: 19881,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'fdce979a-002e-4906-a80f-d161f108bcde',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'omar boi',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'b264744c-0114-46b9-ab28-a7f56aded7bd',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'omar',
        picture: null,
      },
    ],
  },
  {
    id: 19886,
    name: 'Round 1 - Match 5',
    nextMatchId: 19885,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'd9a7b576-9d7e-430c-aa7e-6401d6eb7cf8',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Testteam2',
        picture: null,
      },
      {
        id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test123',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19887,
    name: 'Round 1 - Match 6',
    nextMatchId: 19885,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '8411c4ef-f337-42c9-bff9-63c2f0e80255',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TESTGLL',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '059743f7-9501-471e-8f9e-2d1032eccc67',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeamz',
        picture: null,
      },
    ],
  },
  {
    id: 19889,
    name: 'Round 1 - Match 7',
    nextMatchId: 19888,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'ce914b1b-fe1e-4be9-8409-681049265614',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test5',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '86cd4ff0-14ae-445c-820a-777fe448cddb',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'ALEX',
        picture: null,
      },
    ],
  },
  {
    id: 19890,
    name: 'Round 1 - Match 8',
    nextMatchId: 19888,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test73',
        picture: null,
      },
      {
        id: 'b370498e-5e54-4d98-88ef-ba039ee7fb62',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'adam24',
        picture: null,
      },
    ],
  },
  {
    id: 19894,
    name: 'Round 1 - Match 9',
    nextMatchId: 19893,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'f00e68b3-70d4-46c6-8004-1b2726adb0dc',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'testforcontentful',
        picture: 'teamlogos/5o7zgmejbgc41_ip4xil',
      },
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19895,
    name: 'Round 1 - Match 10',
    nextMatchId: 19893,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '43ddad56-5798-4364-bd5c-81ba2640e22a',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'testing',
        picture: null,
      },
      {
        id: 'a34587db-a088-44ba-98b2-c8efd07df9ed',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeam2253',
        picture: null,
      },
    ],
  },
  {
    id: 19897,
    name: 'Round 1 - Match 11',
    nextMatchId: 19896,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '7eac0db4-2e53-4f42-a670-58847b1f5e4c',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test 1',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '20bc489c-6c63-402f-908e-586e531a96b2',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test146',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19898,
    name: 'Round 1 - Match 12',
    nextMatchId: 19896,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '3947ccbc-18d4-47e3-ba19-f1ba697800e3',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'omarnice',
        picture: null,
      },
      {
        id: '85568369-9f06-4098-be5f-1922e2ae61e5',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Testpubg',
        picture: null,
      },
    ],
  },
  {
    id: 19901,
    name: 'Round 1 - Match 13',
    nextMatchId: 19900,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'e44b992f-676c-492e-98d2-b238162cc2e0',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test team 1234',
        picture: 'teamlogos/image_8_grwpnj',
      },
      {
        id: '5b29528f-0dab-4dea-97d8-e6528b6cfc6c',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'glltest',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19902,
    name: 'Round 1 - Match 14',
    nextMatchId: 19900,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '5a02ce4d-ad2a-4ee7-b3d2-4dad7b9b164a',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeam1243',
        picture: null,
      },
      {
        id: '9d13814a-81b9-43d1-b9f9-42da1fe22578',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adam peleback',
        picture: 'teamlogos/G-Loot_Logo_Portrait_Green_Black128px_yhkf4w',
      },
    ],
  },
  {
    id: 19904,
    name: 'Round 1 - Match 15',
    nextMatchId: 19903,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '856abe5e-5e46-4113-8485-f7829aeb27ba',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'omarpubgnotnice',
        picture: null,
      },
      {
        id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adamamd',
        picture: null,
      },
    ],
  },
  {
    id: 19905,
    name: 'Round 1 - Match 16',
    nextMatchId: 19903,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '8055f16b-3cc9-495a-b40a-2742712be6c6',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Adam testar',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'c934f0ee-c9d8-4cf7-ad55-7f98a7b19b6f',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test2',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19910,
    name: 'Round 1 - Match 17',
    nextMatchId: 19909,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'cb177e1d-6e6c-44b5-829a-45b699529274',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test50',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '2ae79460-4d1c-42a9-88cc-cf76adb4bb08',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Adamadamsms',
        picture: null,
      },
    ],
  },
  {
    id: 19911,
    name: 'Round 1 - Match 18',
    nextMatchId: 19909,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '348c0a6b-5499-421a-9125-6b3d08bcef9c',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestingAgain',
        picture: 'teamlogos/teddy-bear_tmxfyl',
      },
      {
        id: '02aae6b1-bd99-4469-9d5a-4a83019d7dbc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test6000',
        picture: null,
      },
    ],
  },
  {
    id: 19913,
    name: 'Round 1 - Match 19',
    nextMatchId: 19912,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '91c101fd-d744-4eb1-abf1-7edfe09e7429',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeamz123',
        picture: null,
      },
      {
        id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test Post',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19914,
    name: 'Round 1 - Match 20',
    nextMatchId: 19912,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '1262eafb-9d48-4536-a428-fb43d0da2e07',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test 2',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'b4889d7a-5e25-4bae-aa4a-40776f44ef2d',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'omarapexnice',
        picture: null,
      },
    ],
  },
  {
    id: 19917,
    name: 'Round 1 - Match 21',
    nextMatchId: 19916,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '390f872a-fe15-48a3-9283-4191ff4263e7',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Test123',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '59a941da-398d-4dbd-baa6-1769314e5826',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'teståtestätestö',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19918,
    name: 'Round 1 - Match 22',
    nextMatchId: 19916,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'cc4b8479-e825-40a8-b24b-3f0fbfb421f4',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test9',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '3a353047-4af3-4320-b2cf-2d83ddc9115a',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeamData',
        picture: null,
      },
    ],
  },
  {
    id: 19920,
    name: 'Round 1 - Match 23',
    nextMatchId: 19919,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '4b5c9937-9e69-4e5b-8344-6a68d6c12a64',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test9',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'a37c7aeb-38bd-46b8-87f7-3cbaf212a9fb',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestingClient',
        picture: 'teamlogos/gentleman-bear_gwzbjd',
      },
    ],
  },
  {
    id: 19921,
    name: 'Round 1 - Match 24',
    nextMatchId: 19919,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '2486582b-574a-40fc-a8d3-b426cda99abf',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Chat test',
        picture: 'teamlogos/асдасдадс_ziqhqk',
      },
    ],
  },
  {
    id: 19925,
    name: 'Round 1 - Match 25',
    nextMatchId: 19924,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '3ae53b5b-958d-4f01-a40e-bab340036a29',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'testadam',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TESTWTF',
        picture: 'teamlogos/images_wstysk',
      },
    ],
  },
  {
    id: 19926,
    name: 'Round 1 - Match 26',
    nextMatchId: 19924,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: 'c85a0d8a-4e22-4781-8494-d2cd600a3396',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Gloot1 test',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '0f8844f8-91a3-4969-9557-8ac560f3a7d2',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam12344',
        picture: null,
      },
    ],
  },
  {
    id: 19928,
    name: 'Round 1 - Match 27',
    nextMatchId: 19927,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'ad2a0a89-d3bb-49dd-b8fc-2ec100e33477',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Testing new Team',
        picture: null,
      },
      {
        id: '241150ef-951e-4e4c-82b5-9a26125521d1',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test200',
        picture: null,
      },
    ],
  },
  {
    id: 19929,
    name: 'Round 1 - Match 28',
    nextMatchId: 19927,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'a35b99fb-fd75-4ed5-9a51-6cd772beebf0',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeam1696',
        picture: null,
      },
      {
        id: '613f708c-b000-4aa7-a9b1-47de355c9fac',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'testteam',
        picture: null,
      },
    ],
  },
  {
    id: 19932,
    name: 'Round 1 - Match 29',
    nextMatchId: 19931,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '7fbd66f3-7eaa-4567-bc87-5a82f10417ad',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'adamapexnice',
        picture: null,
      },
      {
        id: '6eefadaa-11e0-4551-8874-faec113f875f',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test500000',
        picture: null,
      },
    ],
  },
  {
    id: 19933,
    name: 'Round 1 - Match 30',
    nextMatchId: 19931,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'bb31a7b7-8563-416c-8c8f-b57b7b56fdca',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test teamsfsfsfsfs',
        picture: null,
      },
      {
        id: 'b5edee08-6d0a-4e3d-9587-57a2d585e490',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'Adam testar',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19935,
    name: 'Round 1 - Match 31',
    nextMatchId: 19934,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'f4e36b1f-ba40-4368-ab2e-97cad78c2932',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Testabc',
        picture: null,
      },
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19936,
    name: 'Round 1 - Match 32',
    nextMatchId: 19934,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '3dce492c-ecad-453c-98e7-2b96ddbf8800',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'gloot3 test',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '8ef16ac0-358b-4d6a-8049-1f3962d060e0',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TestTeam1253',
        picture: null,
      },
    ],
  },
];

const demo = [
  {
    id: 260005,
    name: '@undecided',
    nextMatchId: null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    startTime: '2021-05-30',
    state: '', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      {
        id: '2', // Unique identifier of any kind
        resultText: '', // Any string works
        isWinner: false,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        name: 'Ant',
      },
      // {
      //   id: '2',
      //   resultText: 3,
      //   isWinner: false,
      //   status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
      //   name: 'Ant',
      // },
    ],
  },
  {
    id: 260004,
    name: null,
    nextMatchId: 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    startTime: '2021-05-30',
    state: '', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      {
        id: '3', // Unique identifier of any kind
        resultText: 5, // Any string works
        isWinner: true,
        status: 'PLAYED', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        name: 'Aardvark',
      },
      {
        id: '4',
        resultText: 3,
        isWinner: false,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        name: 'Horse',
      },
    ],
  },
  // {
  //   id: 260000,
  //   name: null,
  //   nextMatchId: 260004, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
  //   startTime: '2021-05-30',
  //   state: 'WALK_OVER', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
  //   participants: [
  //     {
  //       id: '3', // Unique identifier of any kind
  //       resultText: null, // Any string works
  //       isWinner: true,
  //       status: 'WALK_OVER', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
  //       name: 'Aardvark',
  //     },
  //   ],
  // },
  {
    id: 260003,
    name: null,
    nextMatchId: 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    startTime: '2021-05-30',
    state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      // {
      //   id: '1', // Unique identifier of any kind
      //   resultText: null, // Any string works
      //   isWinner: false,
      //   status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
      //   name: null,
      // },
      {
        id: '2',
        resultText: null,
        isWinner: false,
        status: 'WALK_OVER', // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        name: 'Ant',
      },
    ],
  },
];

const formatMatchScores = (matchTeams) => {
  return [1, 2];
};

const findNextMatchID = (bracketInfo) => {};

const formatMatchBracket = (bracketInfo, matches) => {
  let res = matches.map((match) => {
    let [state, participants] = formatMatchScores(match.Scores);
    return {
      id: match.ID,
      nextMatchID: 0, //WIP
      startTime: standardDate(match.StartTime, true),
      Bracket: bracketInfo.find((b) => b.MatchID === match.ID),
    };
  });

  return res;
};

const RecIMBracket = ({ series }) => {
  const [loading, setLoading] = useState(false);
  const [width, height] = useWindowSize();
  const [bracketInfo, setBracketInfo] = useState();
  const [formattedBracket, setFormattedBracket] = useState();
  const [formattedMatches, setFormattedMatches] = useState();

  // load bracket info
  useEffect(() => {
    const loadBracketInfo = async () => {
      setLoading(true);
      const request = await getBracketInfo(series.ID);
      setBracketInfo(request);
    };
    loadBracketInfo().then(setLoading(false));
  }, [series.ID]);

  // merge bracket with match
  useEffect(() => {
    if (bracketInfo && series.Match) {
      //seperating result from set state for readability
      let res = formatMatchBracket(bracketInfo, series.Match);
      setFormattedBracket(res);
    }
  }, [bracketInfo, series]);

  // format for package 'MATCHES' prop
  useEffect(() => {
    let formatted_match = {
      id: -1,
      name: null,
      nextMatchId: null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
      startTime: null,
      state: null, // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      participants: [],
    };
    let formatted_matchTeam = {
      id: -1,
      resultText: null, // score or label
      isWinner: false,
      status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
      name: null,
    };
  }, [formattedBracket]);

  console.log('');
  console.log(series.Type);
  console.log(series.Match);
  console.log('');

  if (loading) return <GordonLoader />;
  return (
    <SingleEliminationBracket
      matches={demo}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => <SVGViewer {...props}>{children}</SVGViewer>}
    />
  );
};

export default RecIMBracket;
