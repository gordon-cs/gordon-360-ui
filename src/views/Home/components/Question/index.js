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
    };

  }
  componentWillMount() {
    this.loadQuestion();
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
        <form>
            <div className="radio">
            <label>
              <input type="radio" value="I am not symptomatic" checked={true} />
              I am not symptomatic
           </label>
        </div>
          <div className="radio">
            <label>
              <input type="radio" value="I am symptomatic" />
              Option 2
            </label>
          </div>
      </form>

        </CardContent>
      </Card>

      );
      
    }
    return <div>{content}</div>;
  }
}
