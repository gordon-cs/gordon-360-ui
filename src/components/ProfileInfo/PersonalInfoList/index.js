import React, { useState } from 'react';
import user from 'services/user';
import './index.css';
import ProfileInfoListItem from '../ProfileInfoListItem';
import LockIcon from '@material-ui/icons/Lock';

import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonSnackbar from 'components/Snackbar';

const PRIVATE_INFO = 'Private as requested.';

const formatPhone = (phone) => {
  let tele = String(phone);
  if (tele.length === 10) {
    return '(' + tele.slice(0, 3) + ') ' + tele.slice(3, 6) + '-' + tele.slice(6);
  }
  if (tele !== 'undefined') {
    return tele;
  }
};

const PersonalInfoList = ({
  myProf,
  profile: {
    Advisors,
    BuildingDescription,
    Country,
    Hall,
    HomeCity,
    HomePhone,
    HomeState,
    HomeStreet2,
    ID,
    IsMobilePhonePrivate,
    KeepPrivate,
    Mail_Location,
    Majors,
    Minors,
    MobilePhone,
    OnCampusRoom,
    OnOffCampus,
    PersonType,
    SpouseName,
  },
}) => {
  const [isMobilePhonePrivate, setIsMobilePhonePrivate] = useState(
    Boolean(IsMobilePhonePrivate && MobilePhone !== PRIVATE_INFO),
  );
  const [snackbar, setSnackbar] = useState(null);
  const isOnline = useNetworkStatus();
  const isStudent = PersonType?.includes('stu');
  const isFacStaff = PersonType?.includes('fac');

  // KeepPrivate has different values for Students and FacStaff.
  // Students: null for public, 'S' for semi-private (visible to other students, some info redacted)
  //    or 'P' for Private (not visible to other students)
  // FacStaff: '0' for public, '1' for private
  const keepPrivate = Boolean(KeepPrivate === '1' || KeepPrivate === 'S' || KeepPrivate === 'P');

  /**
   * The following 'is[info]Private' variables represent whether info shown to the user is private
   * and will be hidden from students.
   *
   * FacStaff have a privileged view and will see private info for students and FacStaff.
   * Students can only see their own private info.
   *
   * Some info is private by default and only shown on the personal profile
   * Additionally, some info is private only for "private users", designated by the KeepPrivate flag
   */

  // Students' on-campus location is public unless the student is marked as private
  const isCampusLocationPrivate = isStudent && keepPrivate && OnOffCampus !== PRIVATE_INFO;

  // Students' home phone is always private. FacStaffs' home phone is private for private users
  const isHomePhonePrivate = (isStudent || keepPrivate) && Boolean(HomePhone);

  // Street address info is always private, and City/State/Country info is private for private users
  const isAddressPrivate = (keepPrivate && HomeCity !== PRIVATE_INFO) || HomeStreet2;

  // FacStaff spouses are private for private users
  const isSpousePrivate = isFacStaff && keepPrivate && SpouseName !== PRIVATE_INFO;

  const handleChangeMobilePhonePrivacy = async () => {
    try {
      await user.setMobilePhonePrivacy(!isMobilePhonePrivate);
      setIsMobilePhonePrivate(!isMobilePhonePrivate);

      setSnackbar({
        message: isMobilePhonePrivate ? 'Mobile Phone Hidden' : 'Mobile Phone Visible',
        severity: 'success',
      });
    } catch {
      setSnackbar({ message: 'Privacy Change Failed', severity: 'error' });
    }
  };

  const homePhoneListItem = HomePhone ? (
    <ProfileInfoListItem
      title="Home Phone:"
      contentText={
        myProf ? (
          formatPhone(HomePhone)
        ) : (
          <a href={`tel:${HomePhone}`} className="gc360-text-link">
            {formatPhone(HomePhone)}
          </a>
        )
      }
      contentClass={isHomePhonePrivate ? 'private' : null}
    />
  ) : null;

  const mobilePhoneListItem = MobilePhone ? (
    <ProfileInfoListItem
      title="Mobile Phone:"
      contentText={
        myProf ? (
          formatPhone(MobilePhone)
        ) : MobilePhone === PRIVATE_INFO ? (
          PRIVATE_INFO
        ) : (
          <a href={`tel:${MobilePhone}`} className="gc360-text-link">
            {formatPhone(MobilePhone)}
          </a>
        )
      }
      ContentIcon={
        myProf && (
          <FormControlLabel
            control={
              <Switch onChange={handleChangeMobilePhonePrivacy} checked={!isMobilePhonePrivate} />
            }
            label={isMobilePhonePrivate ? 'Private' : 'Public'}
            labelPlacement="bottom"
            disabled={!isOnline}
          />
        )
      }
      contentClass={isMobilePhonePrivate ? 'private' : null}
    />
  ) : null;

  const home = (
    <ProfileInfoListItem
      title="Home:"
      contentText={
        <>
          {HomeStreet2 && `${HomeStreet2}, `}
          <span className={keepPrivate ? null : 'not-private'}>
            {HomeCity === PRIVATE_INFO
              ? PRIVATE_INFO
              : Country === 'United States of America' || !Country
              ? `${HomeCity}, ${HomeState}`
              : Country}
          </span>
        </>
      }
      contentClass={isAddressPrivate ? 'private' : null}
    />
  );

  const minors =
    Minors?.length > 0 && isStudent ? (
      <ProfileInfoListItem
        title={Minors?.length > 1 ? 'Minors:' : 'Minor:'}
        contentText={Minors?.join(', ')}
      />
    ) : null;

  const majors = isStudent ? (
    <ProfileInfoListItem
      title={Majors?.length > 1 ? 'Majors:' : 'Major:'}
      contentText={Majors?.length < 1 ? 'Undecided' : Majors?.join(', ')}
    />
  ) : null;

  const advisors =
    myProf && isStudent ? (
      <ProfileInfoListItem
        title={Advisors?.length > 1 ? 'Advisors:' : 'Advisor:'}
        contentText={
          Advisors?.length < 1
            ? 'None Assigned'
            : Advisors?.map((a) => `${a.Firstname} ${a.Lastname}`)?.join(', ')
        }
        contentClass={'private'}
      />
    ) : null;

  const onOffCampus =
    isStudent && OnOffCampus ? (
      <ProfileInfoListItem
        title="On/Off Campus:"
        contentText={OnOffCampus}
        contentClass={isCampusLocationPrivate ? 'private' : null}
      />
    ) : null;

  const mailLocation =
    isStudent && Mail_Location ? (
      <ProfileInfoListItem title="Mailbox:" contentText={`#${Mail_Location}`} />
    ) : null;

  const dormInfo =
    isStudent && (BuildingDescription || Hall) ? (
      <ProfileInfoListItem
        title="Dormitory:"
        contentText={
          <>
            <span className={keepPrivate ? null : 'not-private'}>
              {BuildingDescription ?? Hall}
            </span>
            {myProf && OnCampusRoom && `, Room ${OnCampusRoom}`}
          </>
        }
        contentClass={'private'}
      />
    ) : null;

  const studentID =
    isStudent && myProf ? (
      <ProfileInfoListItem
        title="Student ID:"
        contentText={ID}
        ContentIcon={
          <Grid container justify="center">
            <Grid container direction="column" justify="center" alignItems="center">
              <LockIcon />
              Private
            </Grid>
          </Grid>
        }
        contentClass={'private'}
      />
    ) : null;

  const spouse =
    isFacStaff && SpouseName ? (
      <ProfileInfoListItem
        title="Spouse:"
        contentText={SpouseName}
        contentClass={(keepPrivate && myProf) || isSpousePrivate ? 'private' : null}
      />
    ) : null;

  const disclaimer =
    !myProf &&
    (isHomePhonePrivate ||
      isAddressPrivate ||
      isMobilePhonePrivate ||
      isCampusLocationPrivate ||
      isSpousePrivate) ? (
      <Typography align="left" className="disclaimer">
        Private by request, visible only to faculty and staff
      </Typography>
    ) : null;

  return (
    <Grid item xs={12}>
      <Card
        className={`personal-info-list  ${myProf ? 'my-personal-info' : 'public-personal-info'}`}
      >
        <Grid container className="header">
          <CardHeader title="Personal Information" />
        </Grid>
        <CardContent>
          {majors}
          {minors}
          {advisors}
          {onOffCampus}
          {dormInfo}
          {mailLocation}
          {mobilePhoneListItem}
          {homePhoneListItem}
          {studentID}
          {home}
          {spouse}
          {disclaimer}
        </CardContent>
      </Card>

      {myProf && (
        <GordonSnackbar
          open={Boolean(snackbar)}
          onClose={() => setSnackbar(null)}
          text={snackbar?.message}
          severity={snackbar?.severity}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      )}
    </Grid>
  );
};

export default PersonalInfoList;
