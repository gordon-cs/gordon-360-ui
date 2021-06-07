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
import CheckIn, { Status} from 'services/checkin.js';

import './index.scss';

const CheckInQuestion = ({ setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [CheckInQuestion, setCheckInQuestion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    setLoading(true);
    const question = await CheckIn.getQuestion();
    setCheckInQuestion(question);
    setLoading(false);
  };

  const submitAnswer = () => {
    CheckIn.postAnswer(answer).then((status) => setStatus(status));
  };

  if (loading === true) {
    return <GordonLoader />;
  }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={10} md={4}>
        <Card className="wellness-question">
          <CardHeader title="Academic Check-In" className="wellness-header" />
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel>{CheckInQuestion.question}</FormLabel>
                  <div style={{ height: '10px' }}></div>
                  {CheckInQuestion.symptoms.map((item, index) => (
                    <FormLabel key={index}>- {item}</FormLabel>
                  ))}
                  <br />
                  <RadioGroup>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label={`Yes`}
                      onChange={() => {
                        setAnswer(Status.ONCAMPUS);
                      }}
                    />
                    <br></br>
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label={'No'}
                      onChange={() => {
                        setAnswer(Status.NOTONCAMPUS);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item>
            <Collapse in={answer}>
              <Grid container direction="column" align="center" className={answer} spacing={1}>
                <Grid item>
                  <Typography color="textPrimary" className="left">
                    {answer === Status.ONCAMPUS
                      ? CheckInQuestion.yesPrompt
                      : CheckInQuestion.noPrompt}
                    {answer === Status.ONCAMPUS ? (
                      <a href={CheckInQuestion.link} target="_blank" rel="noopener noreferrer">
                        this link
                      </a>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      answer === Status.ONCAMPUS ? setIsDialogOpen(true) : submitAnswer();
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <div className="wellness-header">Lorem Ipsum Shalamalama ding dong</div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CheckInQuestion;
