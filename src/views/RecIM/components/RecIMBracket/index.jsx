import { useState, useEffect } from 'react';
import { getBracketInfo } from 'services/recim/series';
import { useWindowSize } from 'hooks';
import { standardDate } from '../Helpers';
import { useNavigate } from 'react-router-dom';
import styles from './RecIMBracket.module.css';
// import GordonLoader from 'components/Loader';

import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets';
import GordonLoader from 'components/Loader';
//import './styles.css';

export const SingleElimination = ({ data, navigate }) => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  if (data.length === 0) return null;
  return (
    <SingleEliminationBracket
      theme={Theme}
      matches={data}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          width={finalWidth}
          height={finalHeight}
          background="rgb(11, 13, 19)"
          SVGBackground="rgb(11, 13, 19)"
          {...props}
        >
          {children}
        </SVGViewer>
      )}
      onMatchClick={(match) => {
        console.log(match);
        if (match.match.id > 0) navigate(`match/${match.match.id}`);
      }}
      onPartyClick={(team) => {
        console.log(team);
        navigate(`team/${team.id}`);
      }}
    />
  );
};

const Theme = createTheme({
  textColor: { main: '#000000', highlighted: '#F4F2FE', dark: '#707582' },
  matchBackground: { wonColor: '#2D2D59', lostColor: '#1B1D2D' },
  score: {
    background: {
      wonColor: `#10131C`,
      lostColor: '#10131C',
    },
    text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
  },
  border: {
    color: '#292B43',
    highlightedColor: 'RGBA(152,82,242,0.4)',
  },
  roundHeader: { backgroundColor: '#3B3F73', fontColor: '#F4F2FE' },
  connectorColor: '#3B3F73',
  connectorColorHighlight: 'RGBA(152,82,242,0.4)',
  svgBackground: '#0F121C',
  overflow: 'visible',
});

const RecIMBracket = ({ series }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let bracket = await getBracketInfo(series.ID);
      bracket.forEach((b) => {
        b.startTime = b.id > 0 ? standardDate(b.startTime, true, true) : '';
      });
      setData(bracket);
      setLoading(false);
    };
    load();
  }, []);
  console.log(data);

  if (loading) return <GordonLoader />;

  return <SingleElimination data={data} navigate={navigate} />;
};
export default RecIMBracket;
