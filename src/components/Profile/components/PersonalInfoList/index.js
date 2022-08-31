import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Switch,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconButton, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import GordonTooltip from 'components/GordonTooltip';
import { useAuthGroups } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import userService from 'services/user';
import { gordonColors } from 'theme';
import ProfileInfoListItem from '../ProfileInfoListItem';
import UpdatePhone from './components/UpdatePhoneDialog/index.js';
import styles from './PersonalInfoList.module.css';
import AlumniUpdateForm from './components/AlumniUpdateForm';
import CliftonStrengthsService from 'services/cliftonStrengths';

const PRIVATE_INFO = 'Private as requested.';

const formatPhone = (phone) => {
  if (phone?.length === 10) {
    return `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6)}`;
  } else {
    return phone;
  }
};

const PersonalInfoList = ({ myProf, profile, createSnackbar }) => {
  const [isMobilePhonePrivate, setIsMobilePhonePrivate] = useState(
    Boolean(profile.IsMobilePhonePrivate && profile.MobilePhone !== PRIVATE_INFO),
  );
  const [isCliftonStrengthsPrivate, setIsCliftonStrengthsPrivate] = useState(
    profile.CliftonStrengths?.Private,
  );
  const [openAlumniUpdateForm, setOpenAlumniUpdateForm] = useState(false);
  const [mailCombo, setMailCombo] = useState();
  const [showMailCombo, setShowMailCombo] = useState(false);
  const isOnline = useNetworkStatus();
  const isStudent = profile.PersonType?.includes('stu');
  const isFacStaff = profile.PersonType?.includes('fac');
  const isAlumni = profile.PersonType?.includes('alu');
  const isViewerPolice = useAuthGroups(AuthGroup.Police)
  const canViewSensitiveInfo = useAuthGroups(AuthGroup.SensitiveInfoView)

  // KeepPrivate has different values for Students and FacStaff.
  // Students: null for public, 'S' for semi-private (visible to other students, some info redacted)
  //    or 'P' for Private (not visible to other students)
  // FacStaff: '0' for public, '1' for private.
  const keepPrivate = Boolean(
    profile.KeepPrivate === '1' || profile.KeepPrivate === 'S' || profile.KeepPrivate === 'P',
  );

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
  const isCampusLocationPrivate = isStudent && keepPrivate && profile.OnOffCampus !== PRIVATE_INFO;

  // Students' home phone is always private. FacStaffs' home phone is private for private users
  const [isHomePhonePrivate, setIsHomePhonePrivate] = useState(
    (isStudent || keepPrivate) && Boolean(profile.HomePhone),
  );

  // Street address info is always private, and City/State/Country info is private for private users
  const isAddressPrivate =
    (keepPrivate && profile.HomeCity !== PRIVATE_INFO) || profile.HomeStreet2;

  // FacStaff spouses are private for private users
  const isSpousePrivate = isFacStaff && keepPrivate && profile.SpouseName !== PRIVATE_INFO;

  useEffect(() => {
    async function loadMailboxCombination() {
      if (myProf && isStudent) {
        const info = await userService.getMailboxCombination();
        setMailCombo(info.Combination);
      }
    }
    loadMailboxCombination();
  }, [myProf, profile.Mail_Location, isStudent]);

  const handleChangeMobilePhonePrivacy = async () => {
    try {
      await userService.setMobilePhonePrivacy(!isMobilePhonePrivate);
      setIsMobilePhonePrivate(!isMobilePhonePrivate);

      createSnackbar(
        isMobilePhonePrivate ? 'Mobile Phone Visible' : 'Mobile Phone Hidden',
        'success',
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  const handleChangeHomePhonePrivacy = async () => {
    try {
      await userService.setHomePhonePrivacy(!isHomePhonePrivate);
      setIsHomePhonePrivate(!isHomePhonePrivate);

      createSnackbar(
        isHomePhonePrivate
          ? 'Personal Info Visible (This change may take several minutes)'
          : 'Personal Info Hidden (This change may take several minutes)',
        'success',
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  const handleChangeCliftonStrengthsPrivacy = async () => {
    try {
      const newPrivacy = await CliftonStrengthsService.togglePrivacy();
      setIsCliftonStrengthsPrivate(newPrivacy);

      createSnackbar(
        newPrivacy ? 'Clifton Strengths Hidden' : 'Clifton Strengths Public',
        'success',
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  const homePhoneListItem = profile.HomePhone ? (
    <ProfileInfoListItem
      title="Home Phone:"
      contentText={
        myProf ? (
          formatPhone(profile.HomePhone)
        ) : (
          <a href={`tel:${profile.HomePhone}`} className="gc360_text_link">
            {formatPhone(profile.HomePhone)}
          </a>
        )
      }
      privateInfo={isHomePhonePrivate}
      myProf={myProf}
    />
  ) : null;

  const mobilePhoneListItem = profile.MobilePhone ? (
    <ProfileInfoListItem
      title="Mobile Phone:"
      contentText={
        myProf ? (
          <Grid container spacing={0} alignItems="center">
            <Grid item>{formatPhone(profile.MobilePhone)}</Grid>
            <Grid item>
              <UpdatePhone />
            </Grid>
          </Grid>
        ) : profile.MobilePhone === PRIVATE_INFO ? (
          PRIVATE_INFO
        ) : (
          <a href={`tel:${profile.MobilePhone}`} className="gc360_text_link">
            {formatPhone(profile.MobilePhone)}
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
      privateInfo={isMobilePhonePrivate}
      myProf={myProf}
    />
  ) : null;

  let streetAddr = profile.HomeStreet2 ? <span>{profile.HomeStreet2},&nbsp;</span> : null;

  const home = (
    <ProfileInfoListItem
      title="Home:"
      contentText={
        <>
          {streetAddr}
          <span className={keepPrivate ? null : styles.not_private}>
            {profile.HomeCity === PRIVATE_INFO
              ? PRIVATE_INFO
              : profile.Country === 'United States of America' || !profile.Country
              ? `${profile.HomeCity}, ${profile.HomeState}`
              : profile.Country}
          </span>
        </>
      }
      privateInfo={isAddressPrivate}
      myProf={myProf}
    />
  );

  const minors =
    profile.Minors?.length > 0 && !isFacStaff ? (
      <ProfileInfoListItem
        title={profile.Minors?.length > 1 ? 'Minors:' : 'Minor:'}
        contentText={profile.Minors?.join(', ')}
      />
    ) : null;

  const majors =
    isFacStaff || (isAlumni && !profile.Majors?.length) ? null : (
      <ProfileInfoListItem
        title={profile.Majors?.length > 1 ? 'Majors:' : 'Major:'}
        contentText={!profile.Majors?.length ? 'Deciding' : profile.Majors?.join(', ')}
      />
    );

  const updateAlumniInfoButton =
    profile.PersonType === 'alu' && isOnline && myProf ? (
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenAlumniUpdateForm(true);
          }}
          className={styles.update_info_button}
        >
          Update Information
        </Button>
      </Grid>
    ) : null;

  const handleAlumniUpdateForm = (status) => {
    setOpenAlumniUpdateForm(false);
    createSnackbar(status.message, status.type);
  };

  const graduationYear = isAlumni ? (
    <ProfileInfoListItem title={'Graduation Year:'} contentText={profile.PreferredClassYear} />
  ) : null;

  const cliftonStrengths =
    profile.CliftonStrengths && (myProf || !profile.CliftonStrengths.Private) ? (
      <ProfileInfoListItem
        title="Clifton Strengths:"
        contentText={
          <Typography>
            {profile.CliftonStrengths.Themes.map((strength) => (
              <Link href={strength.link} target="_blank" rel="noopener" key={strength.name}>
                <b style={{ color: strength.color }}>{strength.name}</b>
              </Link>
            )).reduce((prev, curr) => [prev, ', ', curr])}
            <GordonTooltip
              title={
                <span style={{ fontSize: '0.8rem' }}>
                  Categories:&nbsp;
                  <span style={{ color: '#60409f' }}>Executing</span>,{' '}
                  <span style={{ color: '#c88a2e' }}>Influencing</span>,{' '}
                  <span style={{ color: '#04668f' }}>Relationship</span>,{' '}
                  <span style={{ color: '#2c8b0f' }}>Thinking</span>
                </span>
              }
              enterTouchDelay={50}
              leaveTouchDelay={5000}
            />
          </Typography>
        }
        ContentIcon={
          myProf && (
            <FormControlLabel
              control={
                <Switch
                  onChange={handleChangeCliftonStrengthsPrivacy}
                  checked={!isCliftonStrengthsPrivate}
                />
              }
              label={isCliftonStrengthsPrivate ? 'Private' : 'Public'}
              labelPlacement="bottom"
              disabled={!isOnline}
            />
          )
        }
        privateInfo={profile.CliftonStrengths.Private}
        myProf={myProf}
      />
    ) : null;

  const advisors =
    myProf && isStudent ? (
      <ProfileInfoListItem
        title={profile.Advisors?.length > 1 ? 'Advisors:' : 'Advisor:'}
        contentText={
          profile.Advisors?.length < 1
            ? 'None Assigned'
            : profile.Advisors?.map((a) => `${a.Firstname} ${a.Lastname}`)?.join(', ')
        }
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const mail =
    isStudent && profile.Mail_Location ? (
      <>
        <ListItem className={styles.profile_info_list_item}>
          <Grid container justify="center" alignItems="center">
            <Grid container item xs={5} alignItems="center">
              <Typography>{'Mailbox:'}</Typography>
            </Grid>
            <Grid container item xs={myProf && mailCombo ? 2 : 7} alignItems="center">
              <Typography>{`#${profile.Mail_Location}`}</Typography>
            </Grid>
            {myProf && mailCombo && (
              <>
                <Grid container item xs={2} alignItems="center">
                  <Typography className={styles.private}>
                    {showMailCombo ? mailCombo : '****'}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="column"
                  item
                  xs={3}
                  md={3}
                  lg={3}
                  justify="center"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => {
                      setShowMailCombo(!showMailCombo);
                    }}
                    aria-label={showMailCombo ? 'Hide Mail Combo' : 'Show Mail Combo'}
                  >
                    {showMailCombo ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        </ListItem>
        <Divider />
      </>
    ) : null;

  const campusDormInfo =
    isStudent && profile.OnOffCampus && !(profile.BuildingDescription || profile.Hall) ? (
      <ProfileInfoListItem
        title="Dormitory:"
        contentText={profile.OnOffCampus}
        private={isCampusLocationPrivate}
        myProf={myProf}
      />
    ) : isStudent ? (
      <ProfileInfoListItem
        title="Dormitory:"
        contentText={
          <>
            <span className={keepPrivate ? null : styles.not_private}>
              {profile.BuildingDescription ?? profile.Hall}
            </span>

            {(myProf || isViewerPolice || canViewSensitiveInfo) && profile.OnCampusRoom && `, Room ${profile.OnCampusRoom}`}
          </>
        }
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const gordonID = myProf || ( isStudent && canViewSensitiveInfo) ? (
    <ProfileInfoListItem
      title="Gordon ID:"
      contentText={profile.ID}
      ContentIcon={
        <Grid container justifyContent="center">
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <LockIcon />
            Private
          </Grid>
        </Grid>
      }
      privateInfo
      myProf={myProf}
    />
  ) : null;

  const spouse =
    isFacStaff && profile.SpouseName ? (
      <ProfileInfoListItem
        title="Spouse:"
        contentText={profile.SpouseName}
        privateInfo={(keepPrivate && myProf) || isSpousePrivate}
      />
    ) : null;

  const note =
    myProf &&
    (isFacStaff ? (
      <Typography align="left" className={styles.note}>
        NOTE: To update your data, please contact{' '}
        <a style={{ color: gordonColors.primary.blue }} href="mailto: hr@gordon.edu">
          Human Resources
        </a>{' '}
        (x4828).
      </Typography>
    ) : isStudent ? (
      <div align="left" className={styles.note}>
        <Typography>NOTE:</Typography>
        <ul>
          <li>
            <Typography>Shaded areas are visible only to you.</Typography>
          </li>
          <li>
            <Typography>
              To update your On Campus Address, please contact{' '}
              <a href="mailto: housing@gordon.edu">Housing</a> (x4263).
            </Typography>
          </li>
          <li>
            <Typography>
              For all other changes or to partially/fully prevent your data from displaying, please
              contact the <a href="mailto: registrar@gordon.edu">Registrar's Office</a> (x4242).
            </Typography>
          </li>
        </ul>
      </div>
    ) : null);

  const disclaimer =
    !myProf &&
    (isHomePhonePrivate ||
      isAddressPrivate ||
      isMobilePhonePrivate ||
      isCampusLocationPrivate ||
      isSpousePrivate) ? (
      <Typography align="left" className={styles.disclaimer}>
        Private by request, visible only to faculty and staff
      </Typography>
    ) : null;

  return (
    <Grid item xs={12}>
      <Card
        className={`${styles.personal_info_list}  ${
          myProf ? styles.my_personal_info : styles.public_personal_info
        }`}
      >
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          className={styles.personal_info_list_header}
        >
          <Grid item xs={8}>
            <CardHeader title="Personal Information" />
          </Grid>
          <Grid item xs={4} align="right">
            {/* visible only for fac/staff on their profile */}
            {isFacStaff && myProf ? (
              <FormControlLabel
                control={
                  <Switch onChange={handleChangeHomePhonePrivacy} checked={!isHomePhonePrivate} />
                }
                label={isHomePhonePrivate ? 'Private' : 'Public'}
                labelPlacement="right"
                disabled={!isOnline}
              />
            ) : null}
          </Grid>
        </Grid>
        <CardContent>
          {updateAlumniInfoButton}
          <List>
            {majors}
            {minors}
            {graduationYear}
            {cliftonStrengths}
            {advisors}
            {campusDormInfo}
            {mail}
            {mobilePhoneListItem}
            {homePhoneListItem}
            {gordonID}
            {home}
            {spouse}
            {note}
            {disclaimer}
          </List>
        </CardContent>
      </Card>
      <AlumniUpdateForm
        profile={profile}
        closeWithSnackbar={(status) => {
          handleAlumniUpdateForm(status);
        }}
        openAlumniUpdateForm={openAlumniUpdateForm}
        setOpenAlumniUpdateForm={(bool) => setOpenAlumniUpdateForm(bool)}
      />
    </Grid>
  );
};

export default PersonalInfoList;
