import { useState, useEffect } from 'react';
import { getBracketInfo } from 'services/recim/series';
import { standardDate } from '../Helpers';
import { Link } from 'react-router-dom';
// import styles from './RecIMBracket.module.css';
import GordonLoader from 'components/Loader';

const RecIMBracket = ({ series }) => {
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

  return <>lol</>;
};

export default RecIMBracket;
