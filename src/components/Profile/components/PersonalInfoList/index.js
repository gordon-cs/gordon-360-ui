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
  List,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

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
    EmergencyContact1,
    EmergencyRelationship1,
    EmergencyHomePhone1,
    EmergencyCellPhone1,
    EmergencyWorkPhone1,
    EmergencyContact2,
    EmergencyRelationship2,
    EmergencyHomePhone2,
    EmergencyCellPhone2,
    EmergencyWorkPhone2,
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
  createSnackbar,
}) => {
  const [isMobilePhonePrivate, setIsMobilePhonePrivate] = useState(
    Boolean(IsMobilePhonePrivate && MobilePhone !== PRIVATE_INFO),
  );
  const isOnline = useNetworkStatus();
  const isStudent = PersonType?.includes('stu');
  const isFacStaff = PersonType?.includes('fac');
  const isPolice = (user.getLocalInfo().college_role === 'gordon police') ? true : false;

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

      createSnackbar(
        isMobilePhonePrivate ? 'Mobile Phone Visible' : 'Mobile Phone Hidden',
        'success',
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
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

  const note = isFacStaff ? (
    <Typography align="left" className="note">
      NOTE:
      <ul>
        <li>
          To prevent your picture from displaying click{' '}
          <a href="https://360.gordon.edu/myprofile"> here</a>.
        </li>
        <li>
          To update your data contact <a href="mailto: hr@gordon.edu">Human Resources</a> (x4828).
        </li>
      </ul>
    </Typography>
  ) : isStudent ? (
    <Typography align="left" className="note">
      NOTE:
      <ul>
        <li>
          To prevent your picture or your cell phone number from displaying, click{' '}
          <a href="https://360.gordon.edu/myprofile">here</a>.
        </li>
        <li>
          To update your On Campus Address, contact <a href="mailto: housing@gordon.edu">Housing</a>
          (x4263).
        </li>
        <li>
          For all other changes or to partially/fully prevent your data from displaying, contact the{' '}
          <a href="mailto: registrar@gordon.edu">Registrar's Office</a> (x4242).
        </li>
      </ul>
    </Typography>
  ) : null;

  const emergencyContact1 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 1 Contact:"
      contentText={EmergencyContact1}
      ContentIcon={
        <Grid container justify="center">
          <Grid container direction="column" justify="center" alignItems="center">
          </Grid>
        </Grid>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyRelationship1 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 1 Relationship:"
      contentText={EmergencyRelationship1}
      ContentIcon={
        <Grid container justify="center">
          <Grid container direction="column" justify="center" alignItems="center">
          </Grid>
        </Grid>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyHomePhone1 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 1 Home Phone:"
      contentText={
        <a href={`tel:${EmergencyHomePhone1}`} className="gc360-text-link">
        {formatPhone(EmergencyHomePhone1)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyCellPhone1 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 1 Cell Phone:"
      contentText={
        <a href={`tel:${EmergencyCellPhone1}`} className="gc360-text-link">
        {formatPhone(EmergencyCellPhone1)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyWorkPhone1 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 1 Work Phone:"
      contentText={
        <a href={`tel:${EmergencyWorkPhone1}`} className="gc360-text-link">
        {formatPhone(EmergencyWorkPhone1)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyContact2 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 2 Contact:"
      contentText={EmergencyContact2}
      ContentIcon={
        <Grid container justify="center">
          <Grid container direction="column" justify="center" alignItems="center">
          </Grid>
        </Grid>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyRelationship2 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 2 Relationship:"
      contentText={EmergencyRelationship2}
      ContentIcon={
        <Grid container justify="center">
          <Grid container direction="column" justify="center" alignItems="center">
          </Grid>
        </Grid>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyHomePhone2 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 2 Home Phone:"
      contentText={
        <a href={`tel:${EmergencyHomePhone2}`} className="gc360-text-link">
        {formatPhone(EmergencyHomePhone2)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyCellPhone2 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 2 Cell Phone:"
      contentText={
        <a href={`tel:${EmergencyCellPhone2}`} className="gc360-text-link">
        {formatPhone(EmergencyCellPhone2)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const emergencyWorkPhone2 = isPolice ? (
    <ProfileInfoListItem
      title="Emergency 2 Work Phone:"
      contentText={
        <a href={`tel:${EmergencyWorkPhone2}`} className="gc360-text-link">
        {formatPhone(EmergencyWorkPhone2)}
      </a>
      }
      contentClass={'private'}
    />
  ) : null;

  const disclaimer1 =
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

    const disclaimer2 = isPolice ? (
    <Typography align="left" className="disclaimer">
        Private: visible only to Gordon Police
      </Typography>
    ) : null;

  return (
    <Grid item xs={12}>
      <Card
        className={`personal-info-list  ${myProf ? 'my-personal-info' : 'public-personal-info'}`}
      >
        <Grid container className="personal-info-list-header">
          <CardHeader title="Personal Information" />
        </Grid>
        <CardContent>
          <List>
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
            {disclaimer1}
            {note}
            {emergencyContact1}
            {emergencyRelationship1}
            {emergencyHomePhone1}
            {emergencyCellPhone1}
            {emergencyWorkPhone1}
            {emergencyContact2}
            {emergencyRelationship2}
            {emergencyHomePhone2}
            {emergencyCellPhone2}
            {emergencyWorkPhone2}
            {disclaimer2}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PersonalInfoList;
