import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GordonLoader from '../../../../components/Loader';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.scss';
import wellness from '../../../../services/wellness.js';

/**
 * Creates the question for the health check feature
 */

const Question = ({ setAnswered }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [wellnessQuestion, setWellnessQuestion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    wellness.getQuestion().then((q) => {
      setWellnessQuestion(q);
      setLoading(false);
    });
  }, [setLoading, setWellnessQuestion]);

  const submitAnswer = () => {
    wellness.postAnswer(answer === 'Yes').then(() => setAnswered(true));
  };

  const header = () => {
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

  const question = () => {
    if (wellnessQuestion !== null) {
      let symptomsJSX = wellnessQuestion.symptoms.map((item, index) => {
        return <FormLabel key={index}>- {item}</FormLabel>;
      });

      return (
        <CardContent>
          <div className="left">
            <FormControl>
              <FormLabel>{wellnessQuestion.question}</FormLabel>
              <div style={{ height: '10px' }}></div>
              {symptomsJSX}
              <br />
              <RadioGroup>
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label={`Yes`}
                  onChange={() => setAnswer('Yes')}
                />
                <br></br>
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label={'No'}
                  onChange={() => setAnswer('No')}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
      );
    }
  };

  const answerSection = () => {
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
            onClick={(e) => {
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
    }
  };

  const symptomsDialog = () => {
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
      <Card className="wellness-check">
        {header()}
        {question()}
        <Divider />
        {answerSection()}
        <div className="wellness-header">Health Center (for students): (978) 867-4300 </div>
        {symptomsDialog()}
      </Card>
    );
  }
};

export default Question;
