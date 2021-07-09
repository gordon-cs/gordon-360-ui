import React, { Component } from 'react';
import IMG from 'react-graceful-image';
import { Typography, Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import handleViewport from 'react-in-viewport';

import './peopleSearchResult.css';

/*Const string was created with https://png-pixel.com/ .
 *It is a 1 x 1 pixel with the same color as gordonColors.neutral.lightGray (7/9/21)
 *Although this doesn't use the gordonColors themes directly,
 *the end result is much cleaner and faster than using the placeholderColor tag of react-graceful-image.
 */
const GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/erVfwAJRwPA/3pinwAAAABJRU5ErkJggg==';
const JPG_BASE64_HEADER = 'data:image/jpg;base64,';

class PeopleSearchResultBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1,
      prefImage: null,
      defImage: null,
      hasBeenRun: false,
    };
    this.loadAvatar = this.loadAvatar.bind(this);
    this.displayAvatar = this.displayAvatar.bind(this);
    if (props.lazyImages === false) {
      this.loadAvatar();
    }
  }

  componentDidUpdate(newProps) {
    if (this.props.Person.AD_Username !== newProps.Person.AD_Username) {
      this.loadAvatar();
    }
  }

  async loadAvatar() {
    //Rename def to defaultImage and pref to preferredImage for clarity
    const { def: defaultImage, pref: preferredImage } = await userService.getImage(
      this.props.Person.AD_Username,
    );

    if (this.props.Person.AD_Username) {
      this.setState({ avatar: JPG_BASE64_HEADER + (preferredImage || defaultImage) });
    }
    this.setState({ hasBeenRun: true });
  }

  displayAvatar() {
    const { inViewport } = this.props;
    if (inViewport && !this.state.hasBeenRun) {
      this.loadAvatar();
    }
    return this.state.avatar;
  }

  render() {
    const { Person, size } = this.props;
    let personClassJobTitle, nickname, fullName, personMailLocation;
    fullName = Person.FirstName + ' ' + Person.LastName;

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
                  src={this.displayAvatar()}
                  alt=""
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="body2">{nickname}</Typography>
                <Typography variant="body2">{personClassJobTitle}</Typography>
                <Typography variant="body2">{Person.Email}</Typography>
                <Typography variant="body2">{personMailLocation}</Typography>
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
              <Grid item xs={6} container justify="flex-end">
                <IMG
                  className="people-search-avatar-large"
                  src={this.displayAvatar()}
                  alt=""
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="body2">{nickname}</Typography>
                <Typography variant="body2">{personClassJobTitle}</Typography>
                <Typography variant="body2">{Person.Email}</Typography>
                <Typography variant="body2">{personMailLocation}</Typography>
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
              <Grid item xs={1}>
                <IMG
                  className="people-search-avatar"
                  src={this.displayAvatar()}
                  alt=""
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {Person.FirstName} {nickname}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.LastName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.Type}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{personClassJobTitle}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.AD_Username}</Typography>
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

const PeopleSearchResult = handleViewport(PeopleSearchResultBlock);
export default PeopleSearchResult;

PeopleSearchResultBlock.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
};
