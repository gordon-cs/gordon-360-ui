import React, { Component } from 'react';
import IMG from 'react-graceful-image';
import { Typography, Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import user from 'services/user';
import { Link } from 'react-router-dom';

import './peopleSearchResult.css';

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

  componentDidMount() {
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
    const { Person, size } = this.props;

    let personClassJobTitle, nickname, personMailLocation;

    // set nicknames up
    if (Person.NickName && Person.FirstName !== Person.NickName) {
      nickname = '(' + Person.NickName + ')';
    }
    // set classes up
    if (Person.Type === 'Student') {
      switch (Person.Class) {
        case '1':
          personClassJobTitle = 'First Year';
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
    } else if (Person.JobTitle && Person.Type !== 'Student') {
      personClassJobTitle = Person.JobTitle;
    }
    // set mailbox up
    if (Person.Mail_Location) {
      personMailLocation =
        Person.Type === 'Student'
          ? 'Mailbox #' + Person.Mail_Location
          : 'Mailstop: ' + Person.Mail_Location;
    }

    /*** Single Size - One Column (Mobile View) ***/
    if (size === 'single') {
      return (
        <>
          <Divider />
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item>
                <IMG
                  className="people-search-avatar-mobile"
                  src={`data:image/jpg;base64,${this.state.avatar}`}
                  alt=""
                  noLazyLoad="true"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">
                  {Person.FirstName} {nickname} {Person.LastName}
                </Typography>
                <div style={{ color: '#666666' }}>
                  <Typography variant="body2">
                    {personClassJobTitle ?? Person.Type}
                    {Person.Type === 'Alum' ? ' ' + Person.PreferredClassYear : null}
                  </Typography>
                  <Typography variant="body2">
                    {Person.Major1Description}
                    {Person.Major2Description ? `, ${Person.Major2Description}` : null}
                    {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                  </Typography>
                  <Typography variant="body2">{Person.Email}</Typography>
                  <Typography variant="body2">{personMailLocation}</Typography>
                </div>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    } else if (size === 'largeImages') {
      /*** Enlarged Images ***/
      return (
        <>
          <Divider />
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item xs={4} container justify="flex-end">
                <IMG
                  className="people-search-avatar-large"
                  src={`data:image/jpg;base64,${this.state.avatar}`}
                  alt=""
                  noLazyLoad="true"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">
                  {Person.FirstName} {nickname} {Person.LastName}
                </Typography>
                <div style={{ color: '#666666' }}>
                  <Typography variant="body2">
                    {personClassJobTitle ?? Person.Type}
                    {Person.Type === 'Alum' ? ' ' + Person.PreferredClassYear : null}
                  </Typography>
                  <Typography variant="body2">
                    {Person.Major1Description}
                    {Person.Major2Description ? `, ${Person.Major2Description}` : null}
                    {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                  </Typography>
                  <Typography variant="body2">{Person.Email}</Typography>
                  <Typography variant="body2">{personMailLocation}</Typography>
                </div>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    } else {
      /*** Full Size - Multiple Columns (Desktop View) ***/
      return (
        <>
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
              <Grid item xs={5}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IMG
                    className="people-search-avatar"
                    src={`data:image/jpg;base64,${this.state.avatar}`}
                    alt=""
                    noLazyLoad="true"
                    placeholderColor="#eeeeee"
                  />
                  <div>
                    <Typography>
                      {Person.FirstName} {nickname} {Person.LastName}
                    </Typography>
                    <Typography variant="subtitle2">
                      {Person.Email?.includes('.') ? Person.Email : null}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={5}>
                <Typography>
                  {personClassJobTitle ?? Person.Type}
                  {Person.Type === 'Alum' ? ' ' + Person.PreferredClassYear : null}
                </Typography>
                <Typography style={{ fontSize: '85%', fontStyle: 'italic', color: '#666666' }}>
                  {Person.Major1Description}
                  {Person.Major2Description ? `, ${Person.Major2Description}` : null}
                  {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{personMailLocation}</Typography>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    }
  }
}

PeopleSearchResult.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    AD_Username: PropTypes.string,
    Nickname: PropTypes.string,
    Type: PropTypes.string,
    Class: PropTypes.string,
    JobTitle: PropTypes.string,
    Mail_Location: PropTypes.string,
    PreferredClassYear: PropTypes.string,
    Major1Description: PropTypes.string,
    Major2Description: PropTypes.string,
    Major3Description: PropTypes.string,
  }).isRequired,
};
