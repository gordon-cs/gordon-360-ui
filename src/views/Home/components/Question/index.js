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
      let num = this.state.questions.qOne.phone;
      let phoneNumber = `(${num.substring(0, 3)}) ${num.substring(3, 6)}-${num.substring(6)}`;
      return (
        <CardContent>
          <div style={questionStyle}>
            <FormControl>
              <FormLabel>{this.state.questions.qOne.question}</FormLabel>
              <br />
              <RadioGroup>
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label={`Phone: ${phoneNumber}`}
                  onChange={() => {
                    this.setState({ qOneAnswer: 'Phone' });
                  }}
                />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label={`Email: ${this.state.questions.qOne.email}`}
                  onChange={() => {
                    this.setState({ qOneAnswer: 'Email' });
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
    if (this.state.questions && this.state.qOneAnswer) {
      // Goes through each symptom and creates JSX out of it
      let symptomsJSX = this.state.questions.qTwo.symptoms.map(item => {
        return <FormLabel>- {item}</FormLabel>;
      });

      return (
        <CardContent>
          <div style={questionStyle}>
            <FormControl>
              <FormLabel>{this.state.questions.qTwo.question}</FormLabel>
              <div style={{ height: '10px' }}></div>
              {symptomsJSX}
              <br />
              <RadioGroup>
                <FormControlLabel
                  value="answer_no"
                  control={<Radio />}
                  label="No"
                  onChange={() => {
                    this.setState({ qTwoAnswer: 'No' });
                  }}
                />
                <FormControlLabel
                  value="answer_yes"
                  control={<Radio />}
                  label="Yes"
                  onChange={() => {
                    this.setState({ qTwoAnswer: 'Yes' });
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
      );
    }
  }

  // Creates the third question of the wellness check
  createQuestionThree(questionStyle) {
    // Checks to make sure the questions are found in the state before
    if (this.state.questions !== null) {
      if (this.state.qTwoAnswer === 'Yes') {
        return (
          <CardContent>
            <div style={questionStyle}>
              <FormControl>
                <FormLabel>
                  {this.state.questions.qTwo.yes.question[0]}
                  <a href=" https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
                    {this.state.questions.qTwo.yes.question[1]}
                  </a>
                  {this.state.questions.qTwo.yes.question[2]}
                </FormLabel>
                <br />
                <RadioGroup>
                  <FormControlLabel
                    value="optionOne"
                    control={<Radio />}
                    label={this.state.questions.qTwo.yes.optionOne}
                  />
                  <FormControlLabel
                    value="optionTwo"
                    control={<Radio />}
                    label={this.state.questions.qTwo.yes.optionTwo}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </CardContent>
        );
      } else if (this.state.qTwoAnswer === 'No') {
        return (
          <CardContent>
            <div style={questionStyle}>
              <FormControl>
                <FormLabel>{this.state.questions.qTwo.no.question}</FormLabel>
                <br />
                <RadioGroup>
                  <FormControlLabel
                    value="optionOne"
                    control={<Checkbox />}
                    label={this.state.questions.qTwo.no.option}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </CardContent>
        );
      } else {
        // Returns and empty div if the second question has not been answered yet
        return <div></div>;
      }
    }
  }

  showSubmitButton() {}

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
    const style = {
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
          <Divider />
          {this.createQuestionThree(questionStyle)}
          <br />
          <Button variant="contained" style={style.button} onClick={this.submitHandler}>
            Submit
          </Button>
          <br />
          <br />
          {/* <form onSubmit = {this.submitHandler}>
          <div className="radio">
              <label>
                <input type="radio" value="I am not symptomatic" name="radio" onClick={this.handleChange}/>
                I am not symptomatic
              </label>
          </div>
          <div className="radio">
              <label>
                <input type="radio" value="I am symptomatic" name="radio" onClick={this.handleChange}/>
                I am symptomatic
              </label>
          </div>
          <div className="submit">
                <input type="submit" name="radio"></input>
          </div>
        </form> */}
        </Card>
      );
    }
    return <div>{content}</div>;
  }
}
