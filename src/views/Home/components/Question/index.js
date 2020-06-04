import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import GordonLoader from '../../../../components/Loader';
import "./Question.css";

export default class Question extends Component {
  constructor(props) {
    super(props);

    
    this.loadQuestion = this.loadQuestion.bind(this);

    this.state = {
      error: null,
      loading: true,
      answered:false,
      questionToAsk:"",
      currentStatus:"",

    };

  }
  componentWillMount() {
    this.loadQuestion();
    this.props.call(this.state.answered);
  }
  async loadQuestion() {
    this.setState({ loading: true });
    try {
      let questionToAsk = "What were gonna ask ?";
      this.setState({ loading: false, questionToAsk});
    } catch (error) {
      this.setState({ error });
    }
  }

  submitHandler = (e) => {
    this.setState({answered: true});
    this.setState({currentStatus: this.state.selected})
    this.props.call(true);
    e.preventDefault();
    //console.log(this.state.currentStatus);
  };

  handleChange= (e) => {
    //console.log(e.target.value);
    this.setState({currentStatus: e.target.value});
  };


  render() {

    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Card>
        <CardContent>
          <CardHeader title="Question" />
        <form onSubmit = {this.submitHandler}>
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

        </form>

        </CardContent>
      </Card>

      );
      
    }
    return <div>{content}</div>;
  }
}
