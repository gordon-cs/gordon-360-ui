import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GordonLoader from '../../../../components/Loader';
import { getQuestions } from './questionData';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../theme';
import './index.scss';
import wellness from '../../../../services/wellness.js';

/**
 * Creates the question for the health check feature
 */

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);

    this.state = {
      error: null,
      loading: true,
      answered: false, //true if student answered the question, initiallized to false for safety
      primaryQuestionAnswer: null, // keeps track of the answer to the wellness check question
      currentStatus: null, //holds the the symptomatic status of the students to pass up to parent
      questions: null, //holds the prompts for the questions and responses
      backendQuestion: '', //holds the main wellness check question coming from backend
      yesPrompt: '', //holds the yes answer prompt from back end
      noPrompt: '', //holds the no answer prompt from back end
    };
  }

  componentWillMount() {
    this.loadQuestion();
    this.props.setAnswered(this.state.answered);
  }

  async componentDidMount() {
    this.setState({ questions: await getQuestions() });
  }

  async loadQuestion() {
    this.setState({ loading: true });
    try {
      await wellness.getQuestion();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async submitHandler(e) {
    this.setState({ answered: true });
    this.props.setAnswered(true);
    await wellness.postAnswer(this.state.currentStatus);
    e.preventDefault();
  }

  // Creates wellness check question
  createQuestion(questionStyle) {
    // Checks to make sure the questions are imported before attempting to access its data
    if (this.state.questions !== null) {
      let symptomsJSX = this.state.questions.qOne.symptoms.map(item => {
        return <FormLabel>- {item}</FormLabel>;
      });

      return (
        <CardContent>
          <div style={questionStyle}>
            <FormControl>
              <FormLabel>{this.state.questions.qOne.question}</FormLabel>
              <div style={{ height: '.625rem' }}></div>
              {symptomsJSX}
              <br />
              <RadioGroup>
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label={`Yes`}
                  onChange={() => {
                    this.setState({ primaryQuestionAnswer: 'Yes', currentStatus: true });
                  }}
                />
                <br></br>
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label={'No'}
                  onChange={() => {
                    this.setState({ primaryQuestionAnswer: 'No', currentStatus: false });
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
      );
    }
    // Shows the Gordon Loader if the data has not yet been found in the state
    else {
      return <GordonLoader />;
    }
  }

  // creates prompt after the first question is answered
  createPrompt(questionStyle) {
    // Checks to make sure the questions are found in the state before
    if (this.state.questions !== null) {
      if (this.state.primaryQuestionAnswer === 'Yes') {
        return (
          <CardContent>
            <div style={questionStyle}>
              <FormControl>
                <FormLabel>
                  {this.state.questions.qOne.yes.question[0]}
                  <a
                    href=" https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html#cdc-chat-bot-open"
                    target="_blank"
                  >
                    {this.state.questions.qOne.yes.question[1]}
                  </a>
                  {this.state.questions.qOne.yes.question[2]}
                </FormLabel>
              </FormControl>
            </div>
          </CardContent>
        );
      } else if (this.state.primaryQuestionAnswer === 'No') {
        return (
          <CardContent>
            <div style={questionStyle}>
              <FormControl>
                <FormLabel>{this.state.questions.qOne.no.question}</FormLabel>
              </FormControl>
            </div>
          </CardContent>
        );
      }
    }
  }

  showSubmitButton(buttonStyle) {
    // Shows submit button
    if (this.state.questions && this.state.primaryQuestionAnswer) {
      return (
        <div>
          <br />
          <Button variant="contained" style={buttonStyle.button} onClick={this.submitHandler}>
            Submit
          </Button>{' '}
          <br />
          <br />
        </div>
      );
    }
    // Doesn't show submit button
    return <div></div>;
  }

  render() {
    // Styles the header
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '.625rem',
      fontSize: 20,
    };

    // Styles each question
    const questionStyle = {
      textAlign: 'left',
    };

    // Styles the submit button
    const buttonStyle = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
    };

    if (this.state.error) {
      throw this.state.error;
    }

    //creates container for the title and questions
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Card className="wellness_check">
          <div style={headerStyle}>
            <Grid container direction="row">
              <Grid item xs={12}>
                <Typography variant="body2" style={headerStyle}>
                  Wellness Check
                </Typography>
              </Grid>
            </Grid>
          </div>
          {this.createQuestion(questionStyle)}
          <Divider />
          {this.createPrompt(questionStyle)}
          {this.showSubmitButton(buttonStyle)}
          <div style={headerStyle}>Health Center: (978) 867-4300 </div>
        </Card>
      );
    }
    return <div>{content}</div>;
  }
}
