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
    const shouldDisableButton =
      this.state.subject === null ||
      this.state.data === null ||
      this.state.subject === '' ||
      this.state.data === '';
    const postData = () => {
      let currentTime = new Date().toLocaleString();
      user.getProfileInfo().then(response => {
        let username = response.AD_Username;
        let data = {
          subject: this.state.subject,
          news: this.state.data,
          time: currentTime,
          name: username,
        };
        studentNewsService.submitStudentNews(data).then(() => {
          window.location.reload();
        });
      });
    };

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Card style={styles.container}>
            <CardHeader title="Subject" />
            <CardContent>
              <OutlinedInput
                value={this.state.subject}
                onChange={event => {
                  this.setState({
                    subject: event.target.value,
                  });
                }}
                autoFocus
                fullWidth
              />
            </CardContent>

            <CardHeader title="Description" />
            <CardContent>
              <OutlinedInput
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
                disabled={shouldDisableButton}
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
