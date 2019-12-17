import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
    };
    this.data = null;
  }

  postData = () => {
    console.log(this.data);

    //user.postImage(croppedImage);
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Card style={styles.container}>
            <CardHeader title="Subject" />
            <CardContent>
              <OutlinedInput autoFocus fullWidth multiline />
            </CardContent>
            <CardHeader title="Write Your Student News Submission" />
            <CardContent>
              <OutlinedInput
                autoFocus
                // style={styles.textField}
                fullWidth
                multiline
                value={this.data}
                onChange={event => {
                  this.data = event.target.value;
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
                onClick={this.postData}
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
