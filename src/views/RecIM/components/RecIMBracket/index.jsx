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

const demo = [
  {
    id: 260005,
    name: 'Final - Match',
    nextMatchId: null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    tournamentRoundText: '4', // Text for Round Header
    startTime: '2021-05-30',
    state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      {
        id: '3', // Unique identifier of any kind
        resultText: 'WON', // Any string works
        isWinner: true,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        name: 'Aardvark',
      },
      {
        id: '2',
        resultText: null,
        isWinner: false,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        name: 'Ant',
      },
    ],
  },
  {
    id: 260004,
    name: 'Final - Match',
    nextMatchId: 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    tournamentRoundText: '4', // Text for Round Header
    startTime: '2021-05-30',
    state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      {
        id: '3', // Unique identifier of any kind
        resultText: 'WON', // Any string works
        isWinner: true,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        name: 'Aardvark',
      },
      {
        id: '4',
        resultText: null,
        isWinner: false,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        name: 'Horse',
      },
    ],
  },
  {
    id: 260003,
    name: 'Final - Match',
    nextMatchId: 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    tournamentRoundText: '4', // Text for Round Header
    startTime: '2021-05-30',
    state: 'DONE', // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    participants: [
      {
        id: '1', // Unique identifier of any kind
        resultText: null, // Any string works
        isWinner: false,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        name: 'Zebra',
      },
      {
        id: '2',
        resultText: 'WON',
        isWinner: true,
        status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        name: 'Ant',
      },
    ],
  },
];

const RecIMBracket = ({ series }) => {
  const [width, height] = useWindowSize();
  const [bracketInfo, setBracketInfo] = useState();
  const [rounds, setRounds] = useState();

  useEffect(() => {
    const loadBracketInfo = async () => {
      const request = await getBracketInfo(series.ID);
      setBracketInfo(request);
    };
    loadBracketInfo();
  }, [series.ID]);

  console.log(bracketInfo);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <SingleEliminationBracket
        matches={demo}
        matchComponent={Match}
        scgWrapper={({ children, ...props }) => <SVGViewer {...props}>{children}</SVGViewer>}
      />
    </Box>
  );
};

export default RecIMBracket;
