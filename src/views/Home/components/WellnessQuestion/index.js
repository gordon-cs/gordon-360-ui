import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import GordonLoader from '../../../../components/Loader';
import wellness from '../../../../services/wellness.js';

import './index.scss';

/**
 * Creates the question for the health check feature
 */

const WellnessQuestion = ({ setAnswered }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [wellnessQuestion, setWellnessQuestion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    wellness
      .getQuestion()
      .then((q) => {
        setWellnessQuestion(q);
      })
      .then(() => setLoading(false));
  }, []);

  const submitAnswer = () => {
    wellness.postAnswer(answer === 'Yes').then(() => setAnswered(true));
  };

  const Header = () => {
    return (
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
  };

  const QuestionText = () => {
    if (wellnessQuestion) {
      return (
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
                    setAnswer('Yes');
                  }}
                />
                <br></br>
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label={'No'}
                  onChange={() => {
                    setAnswer('No');
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
      );
    } else {
      return null;
    }
  };

  const Answer = () => {
    if (wellnessQuestion && answer) {
      let answerClass;
      let answerText;
      let answerLink = null;
      if (answer === 'Yes') {
        answerClass = 'symptoms';
        answerText = wellnessQuestion.yes;
        answerLink = (
          <a href={wellnessQuestion.link} target="_blank" rel="noopener noreferrer">
            this link
          </a>
        );
      } else {
        answerClass = 'healthy';
        answerText = wellnessQuestion.no;
      }
      return (
        <div className={answerClass}>
          <CardContent className="left">
            <div>
              <Typography color="textPrimary">
                {answerText}
                {answerLink}
              </Typography>
            </div>
          </CardContent>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              if (answer === 'Yes') {
                setIsDialogOpen(true);
              } else if (answer === 'No') {
                submitAnswer();
              }
            }}
          >
            Submit
          </Button>
          <br />
          <br />
        </div>
      );
    } else {
      return null;
    }
  };

  const SymptomsDialog = () => {
    return (
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="submit-dialog"
        aria-describedby="submit-symptoms"
        className="symptoms-dialog"
      >
        <DialogTitle>Symptom Positive Response</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to submit that you have recently experienced COVID-19 symptoms.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitAnswer} className="confirm-symptoms">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading === true) {
    return <GordonLoader />;
  } else {
    return (
      <Card className="wellness-question">
        {Header()}
        {QuestionText()}
        <Divider />
        {Answer()}
        <div className="wellness-header">Health Center (for students): (978) 867-4300 </div>
        {SymptomsDialog()}
      </Card>
    );
  }
};

export default WellnessQuestion;
