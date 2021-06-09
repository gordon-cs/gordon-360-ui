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
import CheckIn, { Status } from 'services/checkIn.js';

import './index.scss';

// Declaring variables and hooks for CheckInQuestion
const CheckInQuestion = ({ setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [CheckInQuestion, setCheckInQuestion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Anytime the question element on the page is updated, this useEffect is called
  useEffect(() => {
    loadQuestion();
  }, []);

  // Shows loading circle while it waits for the question to display from the API
  const loadQuestion = async () => {
    setLoading(true);
    /*
    const question = await CheckIn.getQuestion();
    setCheckInQuestion(question);
    */
    setLoading(false);
  };

  // Once a user clicks the submit button with a selected answer, this sends the answer to the API
  // for storage and updates the webpage
  const submitAnswer = () => {
    CheckIn.postAnswer(answer).then((status) => setStatus(status));
  };

  // While loadQuestion is still waiting for a response from the API, show the loading circle.
  if (loading === true) {
    return <GordonLoader />;
  }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={10} md={4}>
        <Card className="checkIn-question">
        <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel>Are you here?</FormLabel>
                  <div style={{ height: '10px' }}></div>
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
                    {/* This piece shows a different prompt in a subbox depending on which answer 
                    in the radio button is selected. We could use this to display a bit of info
                    regarding what ONCAMPUS vs NOTONCAMPUS means */}
                    {answer === Status.ONCAMPUS
                    /*
                      ? CheckInQuestion.yesPrompt
                    : CheckInQuestion.noPrompt*/}

                    {/* This piece below was used to link to an information page on what YELLOW
                     status meant for wellness. I don't think we will need it for our purposes*/}
                    {answer === Status.ONCAMPUS ? (
                      <a href={'https://www.google.com'} target="_blank" rel="noopener noreferrer">
                        this link
                      </a>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      {/* If the student answered Yes, display a warning prompt to confirm. We could
                      maybe use this, but I'm not sure. */}
                      answer === Status.ONCAMPUS ? setIsDialogOpen(true) : submitAnswer();
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <div className="CheckIn-header">For questions, please contact the Registrar's Office 
          (978) 867-4242</div>
        </Card>
      </Grid>
    </Grid>
    /*
    <Grid container justify="center" spacing={2}>
      <Grid item xs={10} md={4}>
        <Card className="checkIn-question">
          <CardHeader title="checkIn Check" className="checkIn-header" />
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel>{CheckInQuestion.question}</FormLabel>
                  <div style={{ height: '10px' }}></div>
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
                      answer === StatusColors.YELLOW ? setIsDialogOpen(true) : submitAnswer();
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <div className="CheckIn-header">Health Center (for students): (978) 867-4300</div>
          <SymptomsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} setStatus={setStatus} />
        </Card>
      </Grid>
    </Grid>*/
  );
};

export default CheckInQuestion;
