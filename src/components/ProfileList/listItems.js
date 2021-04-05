import React from 'react';
import Majors from './../../components/MajorList';
import Minors from './../../components/MinorList';
import Advisors from './../../components/AdvisorList';
import LockIcon from '@material-ui/icons/Lock';

import { Typography, ListItem, Grid, Switch, Divider } from '@material-ui/core';

/**
 * Creates the Home List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {String} privateInfo A string that determines if a piece of information is private
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} addressDisclaimer Determines if the disclaimer style should be used
 *
 * @return {JSX} The JSX of the Home List Item
 */
function createHomeListItem(profile, privateInfo, rowWidths, styles, addressDisclaimer) {
  let userAddress, home;

  if (profile.HomeCity === privateInfo) {
    userAddress = 'Private as requested';
  } else if (profile.Country === 'United States Of America' || profile.Country === '') {
    userAddress = `${profile.HomeCity}, ${profile.HomeState}`;
  } else {
    userAddress = `${profile.Country}`;
  }

  // Creates the address of the user
  let address = (
    <Typography>
      {profile.HomeStreet2 && (
        <span className={addressDisclaimer ? 'disclaimer' : ''} style={styles.privateTextStyle}>
          {profile.HomeStreet2},&nbsp;
        </span>
      )}
      {userAddress}
    </Typography>
  );

  if (address !== '') {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    home = (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography className={addressDisclaimer ? 'disclaimer' : ''}>Home:</Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={styles.gridStyle.lastItem}
              alignItems="center"
            >
              <Typography>{address}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
  return home;
}

/**
 * Creates the Home Phone List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {String} privateInfo A string that determines if a piece of information is private
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} homePhoneDisclaimer Determines if the declaimer style should be used
 * @param {String} formattedPhoneNum The user's phone number properly formatted
 * @param {Boolean} myProf Determines if the current page is the My Profile page
 *
 * @return {JSX} The JSX of the Home Phone List Item
 */
function createHomePhoneListItem(
  profile,
  privateInfo,
  rowWidths,
  styles,
  homePhoneDisclaimer,
  formattedPhoneNum,
  myProf,
) {
  // If the user's home phone is available
  if (profile.HomePhone && profile.HomePhone !== '') {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    let homePhoneJSX;

    // If the Home Phone is available, it's not private and the current page is the Public Profile
    if (profile.HomePhone !== privateInfo && !myProf) {
      homePhoneJSX = (
        <a href={'tel:' + profile.HomePhone} className="number">
          <Typography className={homePhoneDisclaimer ? 'disclaimer' : 'gc360-text-link'}>
            {formattedPhoneNum}
          </Typography>
        </a>
      );
    }
    // If the Home Phone is private
    else if (profile.HomePhone === privateInfo) {
      homePhoneJSX = <Typography>Private as requested</Typography>;
    }
    // If the page is the My Profile page
    else if (myProf) {
      homePhoneJSX = (
        <Typography
          style={String(profile.PersonType).includes('stu') ? styles.privateTextStyle : {}}
        >
          {formattedPhoneNum}
        </Typography>
      );
    }
    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography className={homePhoneDisclaimer ? 'disclaimer' : ''}>
                Home Phone:
              </Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={styles.gridStyle.lastItem}
              alignItems="center"
            >
              {homePhoneJSX}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

/**
 * Creates the Mobile Phone List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {String} privateInfo A string that determines if a piece of information is private
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} mobilePhoneDisclaimer Determines if the declaimer style should be used
 * @param {String} formattedPhoneNum The user's phone number properly formatted
 * @param {Object} classes Styles applied to privacy switch of this list item
 * @param {Boolean} isMobilePhonePrivate Determines if the mobile phone is private
 * @param {String} network Determines if the network is online or offline
 * @param {Boolean} myProf Determines if the current page is the My Profile page
 * @param {Function} handleChangeMobilePhonePrivacy Handles the privacy change of the mobile phone number
 *
 * @return {JSX} The JSX of the Mobile Phone List Item
 */
function createMobilePhoneListItem(
  profile,
  privateInfo,
  rowWidths,
  styles,
  mobilePhoneDisclaimer,
  formattedPhoneNum,
  classes,
  isMobilePhonePrivate,
  network,
  myProf,
  handleChangeMobilePhonePrivacy,
) {
  let mobilephone;
  if (profile.MobilePhone !== undefined && profile.MobilePhone !== '') {
    // Creates the Mobile Phone List Item for the signed-in user's My Profile
    if (myProf && profile.MobilePhone) {
      // Gets the row item widths
      const rowItemOne = rowWidths.threeItems.itemOne;
      const rowItemTwo = rowWidths.threeItems.itemTwo;
      const rowItemThree = rowWidths.threeItems.itemThree;
      mobilephone = (
        <div>
          <ListItem>
            <Grid container alignItems="center" justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={styles.gridStyle.item}
                alignItems="center"
              >
                <Typography>Mobile Phone:</Typography>
              </Grid>
              <Grid
                coontainer
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={{
                  ...styles.gridStyle.item,
                  ...(isMobilePhonePrivate ? styles.privateTextStyle : {}),
                }}
                alignItems="center"
              >
                <Typography>{formattedPhoneNum}</Typography>
              </Grid>

              <Grid
                container
                xs={rowItemThree.xs}
                sm={rowItemThree.sm}
                md={rowItemThree.md}
                lg={rowItemThree.lg}
                style={styles.gridStyle.lastItem}
                alignItems="center"
              >
                <Grid container justify="center" alignItems="center" direction="column">
                  {network === 'online' && (
                    <Switch
                      onChange={() => {
                        handleChangeMobilePhonePrivacy();
                      }}
                      checked={!isMobilePhonePrivate}
                      classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar,
                      }}
                    />
                  )}
                  <Typography>{isMobilePhonePrivate ? 'Private' : 'Public'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }

    // Creates the Mobile Phone List Item for a user's Public Profile
    else {
      // Gets the row item widths
      const rowItemOne = rowWidths.twoItems.itemOne;
      const rowItemTwo = rowWidths.twoItems.itemTwo;
      mobilephone = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid
                container
                xs={rowItemOne.xs}
                sm={rowItemOne.sm}
                md={rowItemOne.md}
                lg={rowItemOne.lg}
                style={styles.gridStyle.item}
                alignItems="center"
              >
                <Typography className={mobilePhoneDisclaimer ? 'disclaimer' : ''}>
                  Mobile Phone:
                </Typography>
              </Grid>
              <Grid
                container
                xs={rowItemTwo.xs}
                sm={rowItemTwo.sm}
                md={rowItemTwo.md}
                lg={rowItemTwo.lg}
                style={styles.gridStyle.lastItem}
                alignItems="center"
              >
                {profile.MobilePhone !== privateInfo && (
                  <a href={'tel:' + profile.MobilePhone} className="number">
                    <Typography
                      className={mobilePhoneDisclaimer ? 'disclaimer' : 'gc360-text-link'}
                    >
                      {formattedPhoneNum}
                    </Typography>
                  </a>
                )}
                {profile.MobilePhone === privateInfo && (
                  <Typography>Private as requested</Typography>
                )}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }
  }
  return mobilephone;
}

/**
 * Creates the Majors List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 *
 * @return {JSX} The JSX of the Majors List Item
 */
function createMajorsListItem(profile, rowWidths, styles) {
  // Shows the majors if the user is a student
  if (String(profile.PersonType).includes('stu')) {
    return <Majors majors={profile.Majors} rowWidths={rowWidths} gridStyle={styles.gridStyle} />;
  }
}

/**
 * Creates the Minors List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 *
 * @return {JSX} The JSX of the Minors List Item
 */
function createMinorsListItem(profile, rowWidths, styles) {
  // Shows the minors if the user is a student and has any minors
  if (String(profile.PersonType).includes('stu') && String(profile.Minors).length !== 0) {
    return <Minors minors={profile.Minors} rowWidths={rowWidths} gridStyle={styles.gridStyle} />;
  }
}

/**
 * Creates the Advisors List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 *
 * @return {JSX} The JSX of the Advisors List Item
 */
function createAdvisorsListItem(profile, rowWidths, styles) {
  // Shows the advisor(s) if the user is a student or 'non assigned' if there are none
  if (String(profile.PersonType).includes('stu')) {
    return (
      <Advisors
        advisors={profile.Advisors}
        rowWidths={rowWidths}
        gridStyle={styles.gridStyle}
        styles={styles.privateTextStyle}
      />
    );
  }
}

/**
 * Creates the Residence List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} campusLocationDisclaimer Determines whether the disclaimer style should be used
 *
 * @return {JSX} The JSX of the Residence List Item
 */
function createResidenceListItem(profile, rowWidths, styles, campusLocationDisclaimer) {
  if (String(profile.PersonType).includes('stu') && profile.OnOffCampus !== '') {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography className={campusLocationDisclaimer ? 'disclaimer' : ''}>
                On/Off Campus:
              </Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={styles.gridStyle.lastItem}
              alignItems="center"
            >
              <Typography className={campusLocationDisclaimer ? 'disclaimer' : ''}>
                {profile.OnOffCampus}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

/**
 * Creates the Dormitory List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} myProf Determines if the current page is the My Profile page
 * @param {Boolean} campusLocationDisclaimer Determines whether the disclaimer style should be used
 *
 * @return {JSX} The JSX of the Dorimitory List Item
 */
function createDormitoryListItem(profile, rowWidths, styles, myProf, campusLocationDisclaimer) {
  if (String(profile.PersonType).includes('stu') && (profile.BuildingDescription || profile.Hall)) {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography className={campusLocationDisclaimer ? 'disclaimer' : ''}>
                Dormitory:{' '}
              </Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={styles.gridStyle.lastItem}
              alignItems="center"
            >
              <Typography className={campusLocationDisclaimer ? 'disclaimer' : ''}>
                {profile.BuildingDescription ? profile.BuildingDescription : profile.Hall}
                {myProf && profile.OnCampusRoom ? (
                  <span style={styles.privateTextStyle}>, Room {profile.OnCampusRoom}</span>
                ) : (
                  ''
                )}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

/**
 * Creates the Mailbox List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 *
 * @return {JSX} The JSX of the Mailbox List Item
 */
function createMailboxItem(profile, rowWidths, styles) {
  if (
    String(profile.PersonType).includes('stu') &&
    profile.Mail_Location !== '' &&
    profile.Mail_Location !== undefined
  ) {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography>Mailbox:</Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={styles.gridStyle.lastItem}
              alignItems="center"
            >
              <Typography>#{profile.Mail_Location}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

/**
 * Creates the Student ID List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 * @param {Boolean} myProf Determines if the current page is the My Profile page
 *
 * @return {JSX} The JSX of the Student ID List Item
 */
function createStudentIDItem(profile, rowWidths, styles, myProf) {
  if (myProf && String(profile.PersonType).includes('stu')) {
    // Gets the row item widths
    const rowItemOne = rowWidths.threeItems.itemOne;
    const rowItemTwo = rowWidths.threeItems.itemTwo;
    const rowItemThree = rowWidths.threeItems.itemThree;
    return (
      <div>
        <ListItem>
          <Grid container justify="center" alignItems="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography>Student ID:</Typography>
            </Grid>
            <Grid
              coontainer
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              justify="right"
              style={styles.gridStyle.item}
            >
              <Typography style={styles.privateTextStyle}>{profile.ID}</Typography>
            </Grid>
            <Grid
              item
              xs={rowItemThree.xs}
              sm={rowItemThree.sm}
              md={rowItemThree.md}
              lg={rowItemThree.lg}
              style={styles.gridStyle.lastItem}
              justify="right"
              align="center"
            >
              <Grid container justify="center">
                <Grid item>
                  <LockIcon className="lock-icon" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

/**
 * Creates the Spouse List Item
 *
 * @param {Object} profile The profile of a user containing all information about them
 * @param {Object} rowWidths Determines the grid lengths of this list item
 * @param {Object} styles An object of all styles that this list item uses
 *
 * @return {JSX} The JSX of the Spouse List Item
 */
function createSpouseItem(profile, rowWidths, styles) {
  if (String(profile.PersonType).includes('fac') && profile.SpouseName) {
    // Gets the row item widths
    const rowItemOne = rowWidths.twoItems.itemOne;
    const rowItemTwo = rowWidths.twoItems.itemTwo;
    return (
      <div>
        <ListItem>
          <Grid container justify="center" alignItems="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={styles.gridStyle.item}
              alignItems="center"
            >
              <Typography>Spouse:</Typography>
            </Grid>
            <Grid
              coontainer
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              justify="right"
              style={styles.gridStyle.item}
            >
              <Typography style={styles.privateTextStyle}>
                {profile.SpouseName === 'Private as requested.'
                  ? String(profile.SpouseName).replace('.', '')
                  : profile.SpouseName}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export {
  createHomeListItem,
  createHomePhoneListItem,
  createMobilePhoneListItem,
  createMajorsListItem,
  createMinorsListItem,
  createAdvisorsListItem,
  createResidenceListItem,
  createDormitoryListItem,
  createMailboxItem,
  createStudentIDItem,
  createSpouseItem,
};
