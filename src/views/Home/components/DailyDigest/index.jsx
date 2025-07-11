import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const DailyDigest = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    // Set a timeout to show error if iframe doesn't load in 10 seconds
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 10000);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setLoading(false);
    setError(false);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              Daily Digest
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Box sx={{ width: '100%', height: '70vh', position: 'relative' }}>
          <iframe
            src="https://announce.gordon.edu/emails/history/"
            title="Daily Digest"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            onLoad={handleLoad}
          />
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.7)',
                zIndex: 1,
              }}
            >
              <CircularProgress size={64} />
            </Box>
          )}
          {error && !loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.7)',
                zIndex: 2,
              }}
            >
              <Typography color="error">Failed to load Daily Digest.</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DailyDigest;
