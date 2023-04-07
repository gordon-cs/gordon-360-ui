import { useState, useEffect } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';
import { Series, BracketInfo, getBracketInfo } from 'services/recim/series';
import { standardDate } from '../Helpers';
// import { Match } from 'services/recim/match';

const RecimBracket = ({ series }: { series: Series }) => {
  const [bracketInfo, setBracketInfo] = useState<BracketInfo[]>();
  const [rounds, setRounds] = useState<IRoundProps[]>([
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }],
        },
      ],
    },
  ]);

  useEffect(() => {
    const loadBracketInfo = async () => {
      const request = await getBracketInfo(series.ID);
      setBracketInfo(request as BracketInfo[]);
    };

    loadBracketInfo();
  }, [series.ID]);

  useEffect(() => {
    const generateBracket = async () => {
      if (!bracketInfo || !series?.Match) return;

      // merge data: series match info + bracket info
      const data = series.Match.map((matchS) => ({
        ...bracketInfo.find((matchB) => matchB.MatchID === matchS.ID),
        ...matchS,
      }));

      // consider changing the types below
      // type tt = BracketInfo & Match;
      type ArrayObjectType = {
        [key: string]: any;
      };

      const dataRounds = data.reduce(function (
        memo: { [key: string]: ArrayObjectType[] },
        x: ArrayObjectType,
      ) {
        if (!memo[x['RoundNumber']]) {
          memo[x['RoundNumber']] = [];
        }
        memo[x['RoundNumber']].push(x);
        return memo;
      },
      {});

      setRounds(
        Object.keys(dataRounds).map((index) => {
          let roundNum = parseInt(index);
          // console.log('round:', index, roundNum, dataRounds[roundNum]);
          return {
            title: 'Round ' + roundNum,
            seeds: dataRounds[index].map((match) => {
              return {
                id: match.MatchID ?? 0,
                date: standardDate(match.StartTime, true),
                teams: [{ name: match.Team[0]?.Name ?? '' }, { name: match.Team[1]?.Name ?? '' }],
              };
            }),
          };
        }),
      );
    };

    generateBracket();
  }, [bracketInfo, series.Match]);

  return <Bracket rounds={rounds} />;
};

export default RecimBracket;
