import { gordonColors } from 'theme';
import styles from './GuestTranscript.module.css';

import { Typography, Grid, Button, Card, CardHeader, CardContent } from '@mui/material';

const GuestTranscript = () => {
  return (
    <a href="mailto:360@gordon.edu" style={{ color: gordonColors.primary.cyan }}>
      360@gordon.edu
    </a>
  );
};

export default GuestTranscript;
