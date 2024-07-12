import { useState, useEffect } from 'react';
import { getBracketInfo } from 'services/recim/series';
import { useWindowSize } from 'hooks';
import { standardDate } from '../Helpers';
import { useNavigate } from 'react-router-dom';
import { theme360 } from 'theme';
import { windowBreakWidths } from 'theme';
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets';
import GordonLoader from 'components/Loader';

export const SingleElimination = ({ data, navigate, width, height }) => {
  if (data.length === 0) return null;
  return (
    <SingleEliminationBracket
      theme={Gordon}
      matches={data}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          width={width}
          height={height}
          background="rgba(0, 0, 0, 0)"
          SVGBackground="rgba(0, 0, 0, 0)"
          {...props}
        >
          {children}
        </SVGViewer>
      )}
      onMatchClick={(match) => {
        if (match.match.id > 0) navigate(`match/${match.match.id}`);
      }}
      onPartyClick={(team) => {
        navigate(`team/${team.id}`);
      }}
    />
  );
};

const Gordon = createTheme({
  textColor: {
    highlighted: '#E9EAEC',
    main: '#BEC0C6',
    dark: '#B8B7B7',
    disabled: '#5D6371',
  },
  roundHeaders: {
    background: '#01498382',
  },
  matchBackground: {
    wonColor: '#01498382',
    lostColor: '#014983BF',
  },
  border: {
    color: '#0149831A',
    highlightedColor: '#00AEEF82',
  },
  score: {
    background: {
      wonColor: '#014983BF',
      lostColor: '#014983BF',
    },
    text: {
      highlightedWonColor: theme360.vars.palette.secondary.dark,
      highlightedLostColor: theme360.vars.palette.error.light,
    },
  },
});

const RecIMBracket = ({ series }) => {
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [componentWidth, setComponentWidth] = useState(0);

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

  useEffect(() => {
    /**
     * 48 is the constant of both sides of padding on the component
     * 6.5/12 is the grid ratio of the parent component
     */
    if (width < windowBreakWidths.breakSM) setComponentWidth(width - 48);
    else setComponentWidth(Math.floor((width * 6.5) / 12) - 48);
  }, [width]);

  if (loading) return <GordonLoader />;

  return (
    <SingleElimination
      data={data}
      navigate={navigate}
      width={componentWidth}
      height={height * 0.75}
    />
  );
};
export default RecIMBracket;
