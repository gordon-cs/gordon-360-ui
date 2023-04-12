import { useState, useEffect } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';
import { Series, BracketInfo, getBracketInfo } from 'services/recim/series';
import { standardDate } from '../Helpers';

const RecIMBracket = ({ series }: { series: Series }) => {
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

      // consider changing the typing strategy here
      // BracketMatchInfo has the combined properties of Match && BracketInfo, but using this errors
      type BracketMatchInfo = {
        [key: string]: any;
      };

      let dataRounds = data.reduce(function (
        memo: { [key: string]: BracketMatchInfo[] },
        x: BracketMatchInfo,
      ) {
        if (!memo[x['RoundNumber']]) {
          memo[x['RoundNumber']] = [];
        }
        memo[x['RoundNumber']].push(x);
        return memo;
      },
      {});

      // iterate through each round
      for (const key in dataRounds) {
        dataRounds[key].sort((a, b) => a.SeedIndex - b.SeedIndex);

        // check if 0 seed doesn't exist
        const newArray: BracketMatchInfo[] = [];
        if (dataRounds[key][0].SeedIndex !== 0) {
          const newObj: BracketMatchInfo = {
            SeedIndex: 0,
            Activity: null,
            Attendance: null,
            ID: null,
            IsLosers: false,
            MatchID: null,
            RoundNumber: 12,
            RoundOf: null,
            Scores: [],
            Series: null,
            StartTime: null,
            Status: null,
            Surface: null,
            Team: [],
          };
          newArray.push(newObj);
        }
        for (let i = 0; i < dataRounds[key].length; i++) {
          newArray.push(dataRounds[key][i]);

          if (
            i < dataRounds[key].length - 1 &&
            dataRounds[key][i + 1].SeedIndex - dataRounds[key][i].SeedIndex > 1
          ) {
            const missingIndexes =
              dataRounds[key][i + 1].SeedIndex - dataRounds[key][i].SeedIndex - 1;

            for (let j = 0; j < missingIndexes; j++) {
              const newNum = dataRounds[key][i].SeedIndex + j + 1;
              const newObj: BracketMatchInfo = {
                SeedIndex: newNum,
                Activity: null,
                Attendance: null,
                ID: null,
                IsLosers: false,
                MatchID: null,
                RoundNumber: null,
                RoundOf: null,
                Scores: [],
                Series: null,
                StartTime: null,
                Status: null,
                Surface: null,
                Team: [],
              };
              newArray.push(newObj);
            }
          }
        }
        dataRounds[key] = newArray;
      }

      setRounds(
        Object.keys(dataRounds).map((index) => {
          let roundNum = parseInt(index);
          return {
            title: 'Round ' + roundNum,
            seeds: dataRounds[index].map((match) => {
              return {
                // using random id to prevent unique key error
                id: match.MatchID ?? Math.random(),
                date: match.StartTime ? standardDate(match.StartTime, true) : '',
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

export default RecIMBracket;
