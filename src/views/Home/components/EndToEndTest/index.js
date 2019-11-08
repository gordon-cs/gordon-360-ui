import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import jobs from '../../../../services/jobs';
import Typography from '@material-ui/core/Typography';

export default class End2EndTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      e2eResponse: null,
    };
  }

  async getE2eTestResult() {
    const response = await jobs.getE2eTestResult();
    console.log('E2e response', response);
    this.setState({
      e2eResponse: response,
    });
  }

  render() {
    let responseText;
    if (this.state.e2eResponse) {
      responseText = <Typography>{this.state.e2eResponse}</Typography>;
    } else {
      responseText = null;
    }
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.getE2eTestResult();
          }}
        >
          Hello World
        </Button>
        {responseText}
      </div>
    );
  }
}
