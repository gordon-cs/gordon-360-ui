import { Link } from '@mui/material';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useNetworkStatus } from 'hooks';
import { useEffect, useState } from 'react';
import victoryPromiseService, { VictoryPromiseCategory } from 'services/victoryPromise';
import GraphDisplay from './components/GraphDisplay';
import IconDisplay from './components/IconDisplay';
import styles from './VictoryPromise.module.css';

const enum DisplayMode {
  Icon,
  Graph,
}

const VictoryPromise = () => {
  const [displayMode, setDisplayMode] = useState(DisplayMode.Icon);
  const [scores, setScores] = useState<Record<VictoryPromiseCategory, number>>({
    christian_character: 0,
    intellectual_maturity: 0,
    lives_of_service: 0,
    leadership_worldwide: 0,
  });
  const isOnline = useNetworkStatus();

  useEffect(() => {
    victoryPromiseService.getVPScore().then(([scores]) =>
      setScores({
        christian_character: scores.TOTAL_VP_CC_SCORE,
        intellectual_maturity: scores.TOTAL_VP_IM_SCORE,
        lives_of_service: scores.TOTAL_VP_LS_SCORE,
        leadership_worldwide: scores.TOTAL_VP_LW_SCORE,
      }),
    );
  }, []);

  return (
    <Card>
      <CardHeader title="Victory Promise" className={styles.header} />
      <CardContent>
        <Stack alignItems="center" spacing={2}>
          <Button
            variant="contained"
            onClick={() =>
              setDisplayMode((m) => (m === DisplayMode.Icon ? DisplayMode.Graph : DisplayMode.Icon))
            }
            color="primary"
          >
            Show {displayMode === DisplayMode.Icon ? 'Graph' : 'Icons'}
          </Button>
          <Box className={styles.content}>
            {displayMode === DisplayMode.Icon ? (
              <IconDisplay scores={scores} />
            ) : (
              <GraphDisplay scores={scores} />
            )}
          </Box>
          {isOnline && (
            <Link
              href="https://www.gordon.edu/victorypromise"
              target="_blank"
              rel="noopener noreferrer"
              className="gc360_text_link"
            >
              Click here for more information!
            </Link>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VictoryPromise;
