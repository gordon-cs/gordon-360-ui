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
import { Checkbox } from '@material-ui/core';

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);

    this.state = {
      error: null,
      loading: true,
      answered: false,
      qOneAnswer: null,
      qTwoAnswer: null,
      qThreeAnswer: null,
      currentStatus: '',
      questions: null,
    };
  }
  componentWillMount() {
    this.loadQuestion();
    this.props.call(this.state.answered);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.qTwoAnswer !== this.state.qTwoAnswer) {
      this.setState({ qThreeAnswer: null });
    }
  }
  async componentDidMount() {
    this.setState({ questions: await getQuestions() });
  }

  async loadQuestion() {
    this.setState({ loading: true });
    try {
      let questionToAsk = 'What were gonna ask ?';
      this.setState({ loading: false, questionToAsk });
    } catch (error) {
      this.setState({ error });
    }
  }

  submitHandler = e => {
    this.setState({ answered: true });
    this.setState({ currentStatus: this.state.selected });
    this.props.call(true, this.state.currentStatus);
    e.preventDefault();
    //console.log(this.state.currentStatus);
  };

  handleChange = e => {
    //console.log(e.target.value);
    this.setState({ currentStatus: e.target.value });
  };

  // Creates the first question of the wellness check
  createQuestionOne(questionStyle) {
    // Checks to make sure the questions are imported before attempting to access its data
    if (this.state.questions !== null) {
      //let num = this.state.questions.qOne.phone;
      //let phoneNumber = `(${num.substring(0, 3)}) ${num.substring(3, 6)}-${num.substring(6)}`;
      let symptomsJSX = this.state.questions.qOne.symptoms.map(item => {
        return <FormLabel>- {item}</FormLabel>;
      });
      return (
        <CardContent>
          <div style={questionStyle}>
            <FormControl>
              <FormLabel>{this.state.questions.qOne.question}</FormLabel>
              <div style={{ height: '10px' }}></div>
              {symptomsJSX}
              <br />
              <RadioGroup>
                <FormControlLabel
                  //value="phone"
                  value="No"
                  control={<Radio />}
                  //label={`Phone: ${phoneNumber}`}
                  label={'No'}
                  onChange={() => {
                    //this.setState({ qOneAnswer: 'Phone' });
                    this.setState({ qOneAnswer: 'No' });
                  }}
                />
                <FormControlLabel
                  //value="email"
                  value="Yes"
                  control={<Radio />}
                  //label={`Email: ${this.state.questions.qOne.email}`}
                  label={`Yes`}
                  onChange={() => {
                    this.setState({ qOneAnswer: 'Yes' });
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

  // Creates the second question of the wellness check
  createQuestionTwo(questionStyle) {
    // Checks to make sure the questions are found in the state before
    if (this.state.questions !== null) {
      if (this.state.qOneAnswer === 'Yes') {
        return (
          <CardContent>
            <div style={questionStyle}>
              <FormControl>
                <FormLabel>
                  {this.state.questions.qOne.yes.question[0]}
                  <a href=" https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html#cdc-chat-bot-open">
                    {this.state.questions.qOne.yes.question[1]}
                  </a>
                  {this.state.questions.qOne.yes.question[2]}
                </FormLabel>
              </FormControl>
            </div>
          </CardContent>
        );
      } else if (this.state.qOneAnswer === 'No') {
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
    if (this.state.questions && this.state.qOneAnswer) {
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
      padding: '10px',
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
          {this.createQuestionOne(questionStyle)}
          <Divider />
          {this.createQuestionTwo(questionStyle)}
          {this.showSubmitButton(buttonStyle)}
          <div style={headerStyle}>Health Center: (978)867-4300 </div>
        </Card>
      );
    }
    return <div>{content}</div>;
  }
}
