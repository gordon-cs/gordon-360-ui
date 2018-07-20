import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import user from '../../../../services/user';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import './peopleSearchResult.css';

export default class PeopleSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
    };
  }

  componentDidUpdate(newProps) {
    if (this.props.Person.AD_Username !== newProps.Person.AD_Username) {
      this.loadAvatar();
    }
  }

  componentWillMount() {
    this.loadAvatar();
  }

  async loadAvatar() {
    this.setState({ avatar: null });
    const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
      await user.getImage(this.props.Person.AD_Username),
    ]);
    const avatar = preferredImage || defaultImage;
    this.setState({ avatar });
  }

  render() {
    const { Person } = this.props;
    let personClass;
    switch (Person.Class) {
      case '':
        personClass = 'Unassigned';
        break;
      case '0':
        personClass = 'Unassigned';
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
        <Divider />
        <Link to={`profile/${Person.AD_Username}`}>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={16}
            style={{
              padding: '1rem',
            }}
          >
            <Grid item xs={1}>
              <img className="avatar" src={`data:image/jpg;base64,${this.state.avatar}`} alt="" />
            </Grid>
            <Grid item xs={3}>
              <Typography className="person-column">{Person.FirstName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="person-column">{Person.LastName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="person-column">{Person.HomeCity}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="person-column">{personClass}</Typography>
            </Grid>
          </Grid>
        </Link>
        <Divider />
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
