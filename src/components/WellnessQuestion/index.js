import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  CardHeader,
  Collapse,
} from '@material-ui/core';

import GordonLoader from 'components/Loader';
import SymptomsDialog from 'components/SymptomsDialog';
import wellness, { StatusColors } from 'services/wellness.js';

import styles from './WellnessQuestion.module.css';

const WellnessQuestion = ({ setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState();
  const [wellnessQuestion, setWellnessQuestion] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    setLoading(true);
    const question = await wellness.getQuestion();
    setWellnessQuestion(question);
    setLoading(false);
  };

  const submitAnswer = () => {
    wellness.postAnswer(answer).then((status) => setStatus(status));
  };

  if (loading === true) {
    return <GordonLoader />;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10} md={4}>
        <Card className={styles.wellness-question}>
          <CardHeader title="Wellness Check" className={styles.wellness-header} />
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel>{wellnessQuestion.question}</FormLabel>
                  <div style={{ height: '10px' }}></div>
                  {wellnessQuestion.symptoms.map((item, index) => (
                    <FormLabel key={index}>- {item}</FormLabel>
                  ))}
                  <br />
                  <RadioGroup>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label={`Yes`}
                      onChange={() => {
                        setAnswer(StatusColors.YELLOW);
                      }}
                    />
                    <br></br>
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label={'No'}
                      onChange={() => {
                        setAnswer(StatusColors.GREEN);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item>
            <Collapse in={!!answer}>
              <Grid container direction="column" align="center" className={answer} spacing={1}>
                <Grid item>
                  <Typography color="textPrimary" className={styles.left}>
                    {answer === StatusColors.YELLOW
                      ? wellnessQuestion.yesPrompt
                      : wellnessQuestion.noPrompt}
                    {answer === StatusColors.YELLOW ? (
                      <a href={wellnessQuestion.link} target="_blank" rel="noopener noreferrer">
                        this link
                      </a>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      answer === StatusColors.YELLOW ? setIsDialogOpen(true) : submitAnswer();
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <div className={styles.wellness-header}>Health Center (for students): (978) 867-4300</div>
          <SymptomsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} setStatus={setStatus} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default WellnessQuestion;
