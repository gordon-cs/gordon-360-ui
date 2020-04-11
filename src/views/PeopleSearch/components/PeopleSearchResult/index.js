import React, { Component } from 'react';
import IMG from 'react-graceful-image';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import user from '../../../../services/user';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import './peopleSearchResult.css';
import '../../../../app.css';

export default class PeopleSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      prefImage: null,
      defImage: null,
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
    let avatar;
    if (this.props.Person.AD_Username) {
      avatar = preferredImage || defaultImage;
    } else {
      avatar = (
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
        </svg>
      );
    }
    this.setState({ avatar });
  }

  render() {
    const { Person } = this.props;
    let personClassJobTitle, nickname, personMailLocation;

    // set nicknames up
    if (
      Person.NickName !== null &&
      Person.NickName !== '' &&
      Person.FirstName !== Person.NickName
    ) {
      nickname = '(' + Person.NickName + ')';
    }
    // set classes up
    if (Person.Type === 'Student') {
      switch (Person.Class) {
        case '1':
          personClassJobTitle = 'Freshman';
          break;
        case '2':
          personClassJobTitle = 'Sophomore';
          break;
        case '3':
          personClassJobTitle = 'Junior';
          break;
        case '4':
          personClassJobTitle = 'Senior';
          break;
        case '5':
          personClassJobTitle = 'Graduate Student';
          break;
        case '6':
          personClassJobTitle = 'Undergraduate Conferred';
          break;
        case '7':
          personClassJobTitle = 'Graduate Conferred';
          break;
        default:
          personClassJobTitle = '-----';
          break;
      }
      // set job titles up
    } else if (Person.Type !== 'Student' && Person.JobTitle !== undefined) {
      personClassJobTitle = Person.JobTitle;
    }
    // set mailbox up
    if (
      Person.Mail_Location !== undefined &&
      Person.Mail_Location !== null &&
      Person.Mail_Location !== ''
    ) {
      personMailLocation = '#' + Person.Mail_Location;
    }

    return (
      <section>
        <Divider />
        <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
            style={{
              padding: '1rem',
            }}
          >
            <Grid item xs={1}>
              <IMG
                className="avatar"
                src={`data:image/jpg;base64,${this.state.avatar}`}
                alt=""
                noLazyLoad="true"
                placeholderColor="#FFF"
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>
                {Person.FirstName} {nickname}{' '}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{Person.LastName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{Person.Type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{personClassJobTitle}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{Person.AD_Username}</Typography>
              <Typography>{personMailLocation}</Typography>
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
