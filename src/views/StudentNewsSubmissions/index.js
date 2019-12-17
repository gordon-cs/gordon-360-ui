import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import user from './../../services/user';
import studentNewsService from './../../services/studentNewsService';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  OutlinedInput,
} from '@material-ui/core/';

export default class StudentNewsSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      version: null,
      data: null,
      subject: null,
    };
  }

  render() {
    const postData = () => {
      let currentTime = new Date().toLocaleString();
      const profile = user.getProfileInfo().then(response => {
        let username = response.AD_Username;
        let data = {
          subject: this.state.subject,
          news: this.state.data,
          time: currentTime,
          name: username,
        };
        studentNewsService.submitStudentNews(data);
      });
    };

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Card style={styles.container}>
            <CardHeader title="Subject" />
            <CardContent>
              <OutlinedInput
                value={this.subject}
                onChange={event => {
                  this.setState({
                    subject: event.target.value,
                  });
                }}
                autoFocus
                fullWidth
              />
            </CardContent>

            <CardHeader title="Write Your Student News Submission" />
            <CardContent>
              <OutlinedInput
                autoFocus
                // style={styles.textField}
                fullWidth
                multiline
                value={this.state.data}
                onChange={event => {
                  this.setState({
                    data: event.target.value,
                  });
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginLeft: 'auto',
                }}
                onClick={postData}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  container: {
    padding: '8px',
  },
  textField: {
    width: '100%',
  },
};
