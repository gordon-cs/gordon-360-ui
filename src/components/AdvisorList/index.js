import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Advisors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let content;
    let advisorPrefix;
    
    if (this.props.advisors) {
      content = this.props.advisors.map(advisor => (
        <div>
          <Typography>{advisor.Firstname + " " + advisor.Lastname}</Typography>
        </div>
      ));

      if (this.props.advisors.length === 0 ) {
        advisorPrefix = (
          <div>
            <Typography>Advisor:</Typography>
          </div>
        );
        content = (
          <div>
            <Typography>(not assigned)</Typography>
          </div>
        );
      }else if (this.props.advisors.length === 1 ) {
        advisorPrefix = (
          <div>
            <Typography>Advisor:</Typography>
          </div>
        );
      } else if (this.props.advisors.length > 1) {
        advisorPrefix = (
          <div>
            <Typography>Advisors:</Typography>
          </div>
        );
      }
      
    }
  return (  
    <div>
      <ListItem>
        <Grid container justify="center">
          <Grid item xs={6} sm={6} md={3} lg={6}>
            <Typography>{advisorPrefix}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
            {content}
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
    );
  }
}
