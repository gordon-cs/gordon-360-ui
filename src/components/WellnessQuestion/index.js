import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import GordonLoader from '../Loader';
import SymptomsDialog from '../SymptomsDialog';
import wellness, { StatusColors } from '../../services/wellness.js';

import './index.scss';

/**
 * Creates the question for the health check feature
 */

const WellnessQuestion = ({ setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [wellnessQuestion, setWellnessQuestion] = useState(null);
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
  } else {
    const header = (
      <div className="wellness-header">
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="body2" className="wellness-header">
              Wellness Check
            </Typography>
          </Grid>
        </Grid>
      </div>
    );

    const questionText = (
      <CardContent>
        <div className="left">
          <FormControl>
            <FormLabel>{wellnessQuestion.question}</FormLabel>
            <div style={{ height: '10px' }}></div>
            {wellnessQuestion.symptoms.map((item, index) => {
              return <FormLabel key={index}>- {item}</FormLabel>;
            })}
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
        </div>
      </CardContent>
    );

    const answerDisclaimer = answer ? (
      <div className={answer}>
        <CardContent className="left">
          <div>
            <Typography color="textPrimary">
              {answer === StatusColors.YELLOW
                ? wellnessQuestion.yesPrompt
                : wellnessQuestion.noPrompt}
              {answer === StatusColors.YELLOW ? (
                <a href={wellnessQuestion.link} target="_blank" rel="noopener noreferrer">
                  this link
                </a>
              ) : null}
            </Typography>
          </div>
        </CardContent>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            answer === StatusColors.YELLOW ? setIsDialogOpen(true) : submitAnswer();
          }}
        >
          Submit
        </Button>
        <br />
        <br />
      </div>
    ) : null;

    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={10} md={4}>
          <Card className="wellness-question">
            {header}
            {questionText}
            <Divider />
            {answerDisclaimer}
            <div className="wellness-header">Health Center (for students): (978) 867-4300</div>
            <SymptomsDialog
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              setStatus={setStatus}
            />
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default WellnessQuestion;
