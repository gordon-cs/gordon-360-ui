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
import './index.scss';
import wellness from '../../../../services/wellness.js';
import user from '../../../../services/user.js';

/**
 * Creates the question for the health check feature
 */

const Question = ({ setAnswered }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [wellnessQuestion, setWellnessQuestion] = useState(null);

  useEffect(() => {
    setLoading(true);
    wellness
      .getQuestion()
      .then((q) => formatQuestion(q))
      .then((q) => {
        setWellnessQuestion(q);
        setLoading(false);
      });
  }, [setLoading, setWellnessQuestion]);

  const submitHandler = (event) => {
    wellness
      .postAnswer(answer === 'Yes')
      .then(() => setAnswered(true))
      .then(() => event.preventDefault());
  };

  const formatQuestion = async (question) => {
    const userInfo = await user.getProfileInfo();

    /* eslint-disable no-template-curly-in-string */
    let wellnessQuestion = question[0].question.replace(
      '${user.FirstName}',
      `${userInfo.FirstName}`,
    );
    wellnessQuestion = wellnessQuestion.replace('${user.LastName}', `${userInfo.LastName}`);

    let [yesPrompt, link] = question[0].yesPrompt.split('https://');

    yesPrompt = yesPrompt.replace('${user.FirstName}', `${userInfo.FirstName}`);
    yesPrompt = yesPrompt.replace('${user.LastName}', `${userInfo.LastName}`);
    link = 'https://' + link;

    let noPrompt = question[0].noPrompt.replace('${user.FirstName}', `${userInfo.FirstName}`);
    noPrompt = noPrompt.replace('${user.LastName}', `${userInfo.LastName}`);
    /* eslint-enable no-template-curly-in-string */

    return {
      question: wellnessQuestion,
      symptoms: [
        'Temperature higher than 100.4°F',
        'New loss of taste or smell',
        'Sore throat',
        'Muscle pain',
        'Cough',
        'Shortness of breath or difficulty breathing',
        'Fever',
        'Chills',
      ],
      yes: yesPrompt,
      no: noPrompt,
      link: link,
    };
  };

  // Creates wellness check question
  const question = () => {
    // Checks to make sure the questions are imported before attempting to access its data
    if (wellnessQuestion !== null) {
      let symptomsJSX = wellnessQuestion.symptoms.map((item) => {
        return <FormLabel>- {item}</FormLabel>;
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
      let answerLink;
      if (answer === 'Yes') {
        answerClass = 'symptoms';
        answerText = wellnessQuestion.yes;
        answerLink = true;
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
                {answerLink ? (
                  <a href={wellnessQuestion.link} target="_blank" rel="noopener noreferrer">
                    this link
                  </a>
                ) : (
                  ''
                )}
              </Typography>
            </div>
          </CardContent>
          <br />
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
          <br />
          <br />
        </div>
      );
    }
  };

  if (loading === true) {
    return <GordonLoader />;
  } else {
    return (
      <Card className="wellness-check symptoms">
        <div className="wellness-header">
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="body2" className="wellness-header">
                Wellness Check
              </Typography>
            </Grid>
          </Grid>
        </div>
        {question()}
        <Divider />
        {answerSection()}
        <div className="wellness-header">Health Center (for students): (978) 867-4300 </div>
      </Card>
    );
  }
};

export default Question;
