import React, { useEffect, useState, Fragment } from 'react';
import IMG from 'react-graceful-image';
import { Typography, Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './PeopleSearchResult.module.css';

/*Const string was created with https://png-pixel.com/ .
 *It is a 1 x 1 pixel with the same color as gordonColors.neutral.lightGray (7/9/21)
 *Although this doesn't use the gordonColors themes directly,
 *the end result is much cleaner and faster than using the placeholderColor tag of react-graceful-image.
 */
const GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/erVfwAJRwPA/3pinwAAAABJRU5ErkJggg==';
const JPG_BASE64_HEADER = 'data:image/jpg;base64,';

const PeopleSearchResult = ({ Person, size, lazyImages }) => {
  const [avatar, setAvatar] = useState(GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1);
  const [hasBeenRun, setHasBeenRun] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [personClassJobTitle, setPersonClassJobTitle] = useState('');
  const [personMailLocation, setPersonMailLocation] = useState('');
  const [maidenName, setMaidenName] = useState();
  const SecondaryText = ({ children, otherProps }) => (
    <Typography variant="body2" color="textSecondary" {...otherProps}>
      {children}
    </Typography>
  );

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

  function handleVisibilityChange(isVisible) {
    if (isVisible && !hasBeenRun) loadAvatar();
  }

  function compileInfo() {
    setFullName(Person.FirstName + ' ' + Person.LastName);

    // set nicknames up
    if (Person.NickName && Person.FirstName !== Person.NickName) {
      setNickname('(' + Person.NickName + ')');
    }
    // set maiden names up
    if (Person.MaidenName && Person.LastName !== Person.MaidenName) {
      setMaidenName('(' + Person.MaidenName + ')');
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
    <VisibilitySensor onChange={handleVisibilityChange}>
      <>
        <Divider />
        {size === 'single' /*** Single Size - One Column (Mobile View) ***/ ? (
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item>
                <IMG
                  className="people-search-avatar-mobile"
                  src={avatar}
                  alt={'Profile picture for ' + fullName}
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">
                  {Person.FirstName} {nickname} {Person.LastName} {maidenName}
                </Typography>
                <SecondaryText>
                  {personClassJobTitle ?? Person.Type}
                  {Person.Type === 'Alum' && Person.PreferredClassYear
                    ? ' ' + Person.PreferredClassYear
                    : null}
                </SecondaryText>
                <SecondaryText>
                  {Person.Major1Description}
                  {Person.Major2Description
                    ? (Person.Major1Description ? ', ' : '') + `${Person.Major2Description}`
                    : null}
                  {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                </SecondaryText>
                <SecondaryText variant="body2">{Person.Email}</SecondaryText>
                <SecondaryText variant="body2">{personMailLocation}</SecondaryText>
              </Grid>
            </Grid>
          </Link>
        ) : size === 'largeImages' /*** Enlarged Images ***/ ? (
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item xs={4} container justifyContent="flex-end">
                <IMG
                  className="people-search-avatar-large"
                  src={avatar}
                  alt={'Profile picture for ' + fullName}
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">
                  {Person.FirstName} {nickname} {Person.LastName} {maidenName}
                </Typography>
                <SecondaryText>
                  {personClassJobTitle ?? Person.Type}
                  {Person.Type === 'Alum' && Person.PreferredClassYear
                    ? ' ' + Person.PreferredClassYear
                    : null}
                </SecondaryText>
                <SecondaryText>
                  {Person.Major1Description}
                  {Person.Major2Description
                    ? (Person.Major1Description ? ', ' : '') + `${Person.Major2Description}`
                    : null}
                  {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                </SecondaryText>
                <SecondaryText variant="body2">{Person.Email}</SecondaryText>
                <SecondaryText variant="body2">{personMailLocation}</SecondaryText>
              </Grid>
            </Grid>
          </Link> /*** Full Size - Multiple Columns (Desktop View) ***/
        ) : (
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
              <Grid item xs={5} container alignItems="center">
                <IMG
                  className="people-search-avatar"
                  src={avatar}
                  alt={'Profile picture for ' + fullName}
                  noLazyLoad="true"
                  noPlaceHolder="true"
                />
                <div>
                  <Typography>
                    {Person.FirstName} {nickname} {Person.LastName} {maidenName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {Person.Email?.includes('.') ? Person.Email : null}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={5}>
                <Typography>
                  {personClassJobTitle ?? Person.Type}
                  {Person.Type === 'Alum' && Person.PreferredClassYear
                    ? ' ' + Person.PreferredClassYear
                    : null}
                </Typography>
                <SecondaryText>
                  {Person.Major1Description}
                  {Person.Major2Description
                    ? (Person.Major1Description ? ', ' : '') + `${Person.Major2Description}`
                    : null}
                  {Person.Major3Description ? `, ${Person.Major3Description}` : null}
                </SecondaryText>
              </Grid>
              <Grid item xs={2}>
                <Typography>{personMailLocation}</Typography>
              </Grid>
            </Grid>
          </Link>
        )}
        <Divider />
      </>
    </VisibilitySensor>
  );
};

// const PeopleSearchResult = handleViewport(PeopleSearchResultBlock);
export default PeopleSearchResult;

PeopleSearchResult.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    AD_Username: PropTypes.string.isRequired,
    Nickname: PropTypes.string,
    Type: PropTypes.string.isRequired,
    Class: PropTypes.string,
    JobTitle: PropTypes.string,
    Mail_Location: PropTypes.string,
    PreferredClassYear: PropTypes.string,
    Major1Description: PropTypes.string,
    Major2Description: PropTypes.string,
    Major3Description: PropTypes.string,
  }).isRequired,
  size: PropTypes.string.isRequired,
  lazyImages: PropTypes.bool.isRequired,
};
