import React, { useEffect, useState } from 'react';
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

const PeopleSearchResultBlock = ({ Person, size, lazyImages, inViewport }) => {
  const [avatar, setAvatar] = useState(GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1);
  const [hasBeenRun, setHasBeenRun] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [personClassJobTitle, setPersonClassJobTitle] = useState('');
  const [personMailLocation, setPersonMailLocation] = useState('');

  useEffect(() => {
    if (lazyImages === false) {
      loadAvatar();
    }
  });

  useEffect(compileInfo);

  async function loadAvatar() {
    //Rename def to defaultImage and pref to preferredImage for clarity
    const { def: defaultImage, pref: preferredImage } = await userService.getImage(
      Person.AD_Username,
    );

    if (Person.AD_Username) {
      setAvatar(JPG_BASE64_HEADER + (preferredImage || defaultImage));
    }
    setHasBeenRun(true);
  }

  function displayAvatar() {
    console.log(inViewport);
    if (inViewport && !hasBeenRun) {
      console.log('hey');
      loadAvatar();
    }
    return avatar;
  }

  function compileInfo() {
    setFullName(Person.FirstName + ' ' + Person.LastName);

    // set nicknames up
    if (Person.NickName && Person.FirstName !== Person.NickName) {
      setNickname('(' + Person.NickName + ')');
    }
    // set classes up
    if (Person.Type === 'Student') {
      switch (Person.Class) {
        case '1':
          setPersonClassJobTitle('First Year');
          break;
        case '2':
          setPersonClassJobTitle('Sophomore');
          break;
        case '3':
          setPersonClassJobTitle('Junior');
          break;
        case '4':
          setPersonClassJobTitle('Senior');
          break;
        case '5':
          setPersonClassJobTitle('Graduate Student');
          break;
        case '6':
          setPersonClassJobTitle('Undergraduate Conferred');
          break;
        case '7':
          setPersonClassJobTitle('Graduate Conferred');
          break;
        default:
          setPersonClassJobTitle('-----');
          break;
      }
      // set job titles up
    } else if (Person.JobTitle && Person.Type !== 'Student') {
      setPersonClassJobTitle(Person.JobTitle);
    }
    // set mailbox up
    if (Person.Mail_Location) {
      setPersonMailLocation(
        Person.Type === 'Student'
          ? 'Mailbox #' + Person.Mail_Location
          : 'Mailstop: ' + Person.Mail_Location,
      );
    }
  }

  return (
    /*** Single Size - One Column (Mobile View) ***/
    size === 'single' ? (
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
                src={displayAvatar()}
                alt={'Profile picture for ' + fullName}
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
    ) : size === 'largeImages' ? (
      /*** Enlarged Images ***/
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
                src={displayAvatar()}
                alt={'Profile picture for ' + fullName}
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
    ) : (
      /*** Full Size - Multiple Columns (Desktop View) ***/
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
                src={displayAvatar()}
                alt={'Profile picture for ' + fullName}
                noLazyLoad="true"
                noPlaceHolder="true"
              />
              {/* <img
                className="people-search-avatar"
                  src={displayAvatar()}
                  alt=""></img> */}
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
    )
  );
};

const PeopleSearchResult = handleViewport(PeopleSearchResultBlock);
export default PeopleSearchResult;

PeopleSearchResultBlock.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.string.isRequired,
  lazyImages: PropTypes.bool.isRequired,
};
