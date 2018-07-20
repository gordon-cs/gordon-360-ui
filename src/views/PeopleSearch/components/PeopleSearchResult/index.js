import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default class PeopleSearchResult extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Person } = this.props;
    let personClass;
    switch (Person.Class) {
      case '0':
        personClass = '0';
        break;
      case '1':
        personClass = 'Freshman';
        break;
      case '2':
        personClass = 'Sophomore';
        break;
      case '3':
        personClass = 'Junior';
        break;
      case '4':
        personClass = 'Senior';
        break;
      case '5':
        personClass = 'Graduate Student';
        break;
      case '6':
        personClass = 'Undergraduate Conferred';
        break;
      case '7':
        personClass = 'Graduate Student';
        break;
      default:
        personClass = '';
        break;
    }
    return (
      <section>
        <Grid container direction="row" onClick={this.handleExpandClick} className="event-item">
          <Grid item xs={3}>
            <Typography className="person-column">{Person.FirstName}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="person-column">{Person.LastName}</Typography>
          </Grid>
          {/* <Grid item xs={3}>
                        <Typography className="person-column">{Person.Email}</Typography>
                    </Grid> */}
          <Grid item xs={3}>
            <Typography className="person-column">{personClass}</Typography>
          </Grid>
        </Grid>
      </section>
    );
  }
}

PeopleSearchResult.propTypes = {
  person: PropTypes.shape({
    First_Name: PropTypes.string.isRequired,
    Last_Name: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
};
