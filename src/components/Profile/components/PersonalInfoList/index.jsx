import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  List,
  ListItem,
  Switch,
  Typography,
} from '@mui/material';
import { IconButton, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GordonTooltip from 'components/GordonTooltip';
import GordonDialogBox from 'components/GordonDialogBox';
import { useAuthGroups } from 'hooks';
import { useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import userService from 'services/user';
import ProfileInfoListItem from '../ProfileInfoListItem';
import UpdatePhone from './components/UpdatePhoneDialog';
import UpdatePlannedGraduationYear from './components/UpdatePlannedGraduationYear';
import styles from './PersonalInfoList.module.css';
import AlumniUpdateForm from './components/AlumniUpdateForm';
import CliftonStrengthsService from 'services/cliftonStrengths';
import SLock from './Salsbury.png';
import DPLock from './DandP.png';
import DDLock from './DandD.png';
import UpdateUserPrivacy from './UpdateUserPrivacyDropDownMenu';

const formatPhone = (phone) => {
  if (phone?.length === 10) {
    return `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6)}`;
  } else if (phone?.length === 11 && phone[0] === '1') {
    return `(${phone?.slice(1, 4)}) ${phone?.slice(4, 7)}-${phone?.slice(7)}`;
  } else {
    return phone;
  }
};

const PersonalInfoList = ({ myProf, profile, isOnline, createSnackbar }) => {
  const [isCliftonStrengthsPrivate, setIsCliftonStrengthsPrivate] = useState(
    profile.CliftonStrengths?.Private,
  );
  const [openAlumniUpdateForm, setOpenAlumniUpdateForm] = useState(false);
  const [mailCombo, setMailCombo] = useState();
  const [advisorsList, setAdvisorsList] = useState([]);
  const [showMailCombo, setShowMailCombo] = useState(false);
  const isStudent = profile.PersonType.includes('stu');
  const isFacStaff = profile.PersonType.includes('fac');
  const isAlumni = profile.PersonType.includes('alu');
  const [isViewerPolice, canViewSensitiveInfo, canViewAcademicInfo] = useAuthGroups(
    AuthGroup.Police,
    AuthGroup.SensitiveInfoView,
    AuthGroup.AcademicInfoView,
  );
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [profPlannedGradYear, setProfPlannedGradYear] = useState(profile.PlannedGradYear);

  // KeepPrivate is either 'Y' or 'P' to indicated student information should be kept private
  // from other students but still available for faculty and staff.  The use of 'S' (for semi-
  // private) used to cause address information to be suppressed, but it is no longer used.
  // Use of KeepPrivate for FacStaff is deprecated.
  const keepPrivate = Boolean(profile.KeepPrivate === 'Y' || profile.KeepPrivate === 'P');

  // Students' on-campus location is public unless the student is marked as private or their
  const isCampusLocationPrivate = keepPrivate || (isStudent && profile.OnOffCampus?.isPrivate);

  // Students' home phone is always private. FacStaff can choose to restrict their home phone
  const isHomePhonePrivate =
    keepPrivate || isStudent || (isFacStaff && profile.HomePhone?.isPrivate);

  // Student and FacStaff can restrict access to mobile phone
  const isMobilePhonePrivate = keepPrivate || profile.MobilePhone?.isPrivate;

  // Street address info is always private, and City/State/Country may be restricted
  const isAddressPrivate =
    keepPrivate ||
    profile.HomeCity?.isPrivate ||
    profile.HomeState?.isPrivate ||
    profile.HomeCountry?.isPrivate ||
    profile.Country?.isPrivate;

  // Users may restrict name of spouse
  const isSpousePrivate = keepPrivate || profile.SpouseName?.isPrivate;

  // Students should not have the 'FacStaff' visibility option in privacy settings
  const excludedVisibilityList = isStudent ? ['FacStaff'] : [];

  // Get a student's mailbox combination and advisor using information in their profile
  useEffect(() => {
    async function loadPersonalInfo() {
      if (isStudent) {
        if (myProf) {
          const info = await userService.getMailboxInformation();
          setMailCombo(info.Combination);
        }
        if (canViewAcademicInfo || myProf) {
          userService.getAdvisors(profile.AD_Username).then(setAdvisorsList);
        }
      }
    }
    loadPersonalInfo();
  }, [myProf, profile.Mail_Location, isStudent]);

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
          <Grid className={styles.not_private}>{formatPhone(profile.HomePhone.value)}</Grid>
        ) : (
          <a href={`tel:${profile.HomePhone.value}`} className="gc360_text_link">
            {formatPhone(profile.HomePhone.value)}
          </a>
        )
      }
      ContentIcon={
        myProf &&
        !isStudent &&
        UpdateUserPrivacy(profile.AD_Username, ['HomePhone'], excludedVisibilityList)
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
          <Grid container spacing={0} alignItems="center" className={styles.not_private}>
            <Grid item>{formatPhone(profile.MobilePhone.value)}</Grid>
            <Grid item>{isStudent ? <UpdatePhone /> : null}</Grid>
          </Grid>
        ) : (
          <a href={`tel:${profile.MobilePhone.value}`} className="gc360_text_link">
            {formatPhone(profile.MobilePhone.value)}
          </a>
        )
      }
      ContentIcon={
        myProf && UpdateUserPrivacy(profile.AD_Username, ['MobilePhone'], excludedVisibilityList)
      }
      privateInfo={isMobilePhonePrivate}
      myProf={myProf}
    />
  ) : null;

  let streetAddr = profile.HomeStreet2?.value ? (
    <span>{profile.HomeStreet2.value},&nbsp;</span>
  ) : null;
  //let streetAddr = profile.HomeStreet1?.value ? <span>{profile.HomeStreet1.value},&nbsp;</span> : null;

  // Users have the ability to restrict access to their home address information.  Since privacy
  // is tied to individual profile items, if the user requests a change to their address privacy
  // setting then we need to change the privacy settings on multiple profile items.  Here we
  // construct a list of times that must be updated.
  let homePrivacyFields =
    profile.Country === 'United States of America' || !profile.Country
      ? ['HomeCity', 'HomeState']
      : ['Country', 'HomeCountry'];

  const home =
    (profile.HomeCity && profile.HomeState) || profile.Country ? (
      <ProfileInfoListItem
        title="Home:"
        contentText={
          <>
            <span className={styles.private}>{streetAddr}</span>
            {profile.Country === 'United States of America' || !profile.Country
              ? `${profile.HomeCity?.value}, ${profile.HomeState?.value}`
              : profile.Country?.value}
          </>
        }
        ContentIcon={
          myProf &&
          UpdateUserPrivacy(profile.AD_Username, homePrivacyFields, excludedVisibilityList)
        }
        privateInfo={isAddressPrivate}
        myProf={myProf}
      />
    ) : null;

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

  const plannedGraduationYear =
    myProf && isStudent ? (
      <ProfileInfoListItem
        title={'Planned Graduation Year:'}
        contentText={
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              {!profPlannedGradYear
                ? 'Fill in with your planned graduation year'
                : profPlannedGradYear}
            </Grid>
            <Grid item>
              <UpdatePlannedGraduationYear change={setProfPlannedGradYear} />
            </Grid>
          </Grid>
        }
      />
    ) : profPlannedGradYear ? (
      <ProfileInfoListItem
        title={'Planned Graduation Year:'}
        contentText={profile.PlannedGradYear}
        myProf={myProf}
      />
    ) : null;

  const updateAlumniInfoButton =
    isAlumni && isOnline && myProf ? (
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

  const gradYearAndMajor = () => {
    var text = profile.PreferredClassYear;
    if (profile.Major1Description !== '') {
      text += ' | ' + profile.Major1Description;
    }
    if (profile.Major2Description !== '') {
      text += ' & ' + profile.Major2Description;
    }
    return text;
  };

  const graduationYear = isAlumni && (
    <ProfileInfoListItem title={profile.College + ' Alum:'} contentText={gradYearAndMajor()} />
  );

  const showCliftonStrengthsBlock =
    (profile.CliftonStrengths && !profile.CliftonStrengths.Private) ||
    (myProf && (isStudent || isFacStaff));

  const cliftonStrengths = showCliftonStrengthsBlock && (
    <ProfileInfoListItem
      title="Clifton Strengths:"
      contentText={
        profile.CliftonStrengths ? (
          <Typography>
            {profile.CliftonStrengths.Themes.map((strength) => (
              <a href={strength.link} target="_blank" rel="noopener noreferrer" key={strength.name}>
                <b style={{ color: strength.color }}>{strength.name}</b>
              </a>
            )).reduce((prev, curr) => [prev, ', ', curr])}
            <GordonTooltip enterTouchDelay={50} leaveTouchDelay={5000}>
              <span style={{ fontSize: '0.8rem' }}>
                Categories:&nbsp;
                <span style={{ color: '#60409f' }}>Executing</span>,{' '}
                <span style={{ color: '#c88a2e' }}>Influencing</span>,{' '}
                <span style={{ color: '#04668f' }}>Relationship</span>,{' '}
                <span style={{ color: '#2c8b0f' }}>Thinking</span>
              </span>
            </GordonTooltip>
          </Typography>
        ) : (
          <Typography>
            {' '}
            No strengths to show.{' '}
            <Link
              href="https://gordon.gallup.com/signin/default.aspx"
              underline="hover"
              target="_blank"
              className={'gc360_text_link'}
              rel="noopener noreferrer"
            >
              Take the test
            </Link>{' '}
          </Typography>
        )
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
      privateInfo={profile.CliftonStrengths?.Private}
      myProf={myProf}
    />
  );

  const advisors =
    (myProf || canViewAcademicInfo) && isStudent ? (
      <ProfileInfoListItem
        title={advisorsList?.length > 1 ? 'Advisors:' : 'Advisor:'}
        contentText={
          advisorsList.length < 1
            ? 'None Assigned'
            : advisorsList.map((a) => `${a.Firstname} ${a.Lastname}`)?.join(', ')
        }
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const mail =
    isStudent && profile.Mail_Location ? (
      <>
        <ListItem className={styles.profile_info_list_item}>
          <Grid container alignItems="center">
            <Grid container item xs={5} alignItems="center">
              <Typography>{'Mailbox:'}</Typography>
            </Grid>
            <Grid container item xs={myProf && mailCombo ? 2.5 : 5} alignItems="center">
              <Typography>{`#${profile.Mail_Location}`}</Typography>
            </Grid>
            {myProf && mailCombo && (
              <>
                <Grid container item xs={1.1} alignItems="center">
                  <Typography className={styles.private} marginLeft="-0.5em">
                    {showMailCombo ? mailCombo : '****'}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="column"
                  item
                  xs={1}
                  md={1}
                  lg={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => {
                      setShowMailCombo(!showMailCombo);
                    }}
                    aria-label={showMailCombo ? 'Hide Mail Combo' : 'Show Mail Combo'}
                    size="large"
                  >
                    {showMailCombo ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsJoinDialogOpen(true)}
                >
                  Instructions
                </Button>
                <GordonDialogBox
                  open={isJoinDialogOpen}
                  title={`Mailbox Instructions`}
                  onClose={() => setIsJoinDialogOpen(false)}
                  cancelButtonClicked={() => setIsJoinDialogOpen(false)}
                  cancelButtonName="Close"
                  maxWidth="md"
                >
                  <Grid container>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                      <Link
                        className={styles.salsbury_link}
                        href="https://m.youtube.com/shorts/FxE5PPS94sc"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                      >
                        Salsbury Mailbox
                      </Link>
                      <Typography className={styles.salsbury_typography}>
                        (Combinations that have three numbers ex: 21 32 18)
                      </Typography>
                      <img src={SLock} alt="SLock" />
                      <br />
                      1. To open, turn LEFT at least four turns stopping at the first number of the
                      combination.
                      <br />
                      2. Turn RIGHT passing the first number of the combination once and stop at the
                      second number of the combination.
                      <br />
                      3. Turn LEFT stopping at the third number of the combination.
                      <br />
                      4. Turn knob to the RIGHT to open.
                      <br />
                      <br />
                      <Link
                        className={styles.dp_link}
                        href="https://m.youtube.com/shorts/47402r3FqSs"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                      >
                        Dial and Pointer Mailbox
                      </Link>
                      <Typography className={styles.dp_typography}>
                        (Combinations that have two letters ex: H B)
                      </Typography>
                      <img src={DPLock} alt="DPLock" />
                      <br />
                      1. Turn the large letter wheel until the first letter of the two-letter
                      combination is lined up with the indication notch located just above the
                      letter wheel in a 12 o’clock position. Line up the small line that is exactly
                      above each letter with this indication notch.
                      <br />
                      2. Leave the letter wheel where you just put it. Now turn the pointer only
                      until it points to the second letter of the combination. The first letter of
                      the combination will always be at the 12 o’clock position; the pointer will
                      always point to the second letter of the combination. Example, in the picture
                      above, it is showing the combination of A G.
                      <br />
                      3. Twist the latch knob clockwise to open the box.
                      <br />
                      <br />
                      <Link
                        className={styles.dd_link}
                        href="https://m.youtube.com/shorts/0VuTFs1Iwnw"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                      >
                        Double Dial Mailbox
                      </Link>
                      <Typography className={styles.dd_typography}>
                        (Combinations that have two letter/number pairs ex: A3 H5)
                      </Typography>
                      <img src={DDLock} alt="DDLock" />
                      <br />
                      1. Each letter (A-K on left dial, L-V on right dial) has been assigned four
                      white or silver lines on your mailbox. The SHORTEST line is #1 and the LONGEST
                      line is #3. For example, in the picture above, the combination A1 L1 is shown.
                      <br />
                      2. Move the LEFT dial to the line indicated by the FIRST letter/number code
                      given; the RIGHT dial to the line indicated by the SECOND letter/number code.
                      Align those lines with the “indication notch” located at the 12 o’clock
                      position directly above each dial.
                      <br />
                      3. When the dials are correctly positioned, move the latch lever to the right
                      to open box.
                    </Typography>
                  </Grid>
                </GordonDialogBox>
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
            <span className={styles.not_private}>
              {profile.BuildingDescription ?? profile.Hall}
            </span>

            {(myProf || isViewerPolice || canViewSensitiveInfo) &&
              profile.OnCampusRoom &&
              `, Room ${profile.OnCampusRoom}`}
          </>
        }
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const gordonID =
    myProf || (isStudent && canViewSensitiveInfo) ? (
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
        contentText={profile.SpouseName.value}
        ContentIcon={
          isFacStaff &&
          myProf &&
          UpdateUserPrivacy(profile.AD_Username, ['SpouseName'], excludedVisibilityList)
        }
        privateInfo={isSpousePrivate}
        myProf={myProf}
      />
    ) : null;

  const note =
    myProf &&
    (isFacStaff ? (
      <Typography align="left" className={styles.note}>
        NOTE: To update your personal info, please go to{' '}
        <a href="https://gordon.criterionhcm.com/" className={`gc360_text_link`}>
          Criterion
        </a>{' '}
        and look under "Personal Info" tab.
      </Typography>
    ) : isStudent ? (
      <div align="left" className={styles.note}>
        <Typography>NOTE:</Typography>
        <ul>
          <li>
            <Typography>Private and shaded information is visible to authprized users.</Typography>
          </li>
          <li>
            <Typography>
              To update your On Campus Address, please contact{' '}
              <a
                href="mailto: housing@gordon.edu"
                className={`gc360_text_link ${styles.note_link}`}
              >
                Housing
              </a>{' '}
              (x4263).
            </Typography>
          </li>
          <li>
            <Typography>
              Setting your planned graduation date above does not replace the Application to
              Graduate, which must be filled out 8-12 months before you plan to graduate. The
              application can be found in{' '}
              <a href="https://my.gordon.edu" className={`gc360_text_link ${styles.note_link}`}>
                my.gordon.edu
              </a>
              , in the Academics tab, on the left.
            </Typography>
          </li>
          <li>
            <Typography>
              For all other changes or to partially/fully prevent your data from displaying, please
              contact the{' '}
              <a
                href="mailto: registrar@gordon.edu"
                className={`gc360_text_link ${styles.note_link}`}
              >
                Registrar's Office
              </a>{' '}
              (x4242).
            </Typography>
          </li>
        </ul>
      </div>
    ) : null);

  const disclaimer = !myProf ? (
    isHomePhonePrivate ||
    isAddressPrivate ||
    isMobilePhonePrivate ||
    isCampusLocationPrivate ||
    isSpousePrivate ||
    cliftonStrengths ? (
      <Typography align="left" className={styles.disclaimer}>
        Visible only to authorized personnel
      </Typography>
    ) : (
      <Typography align="center">No personal information to display</Typography>
    )
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
          <Grid container className={styles.header}>
            <CardHeader title="Personal Information" />
          </Grid>
        </Grid>
        <CardContent>
          {updateAlumniInfoButton}
          <List>
            {majors}
            {minors}
            {plannedGraduationYear}
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
        closeWithSnackbar={handleAlumniUpdateForm}
        openAlumniUpdateForm={openAlumniUpdateForm}
        setOpenAlumniUpdateForm={(bool) => setOpenAlumniUpdateForm(bool)}
      />
    </Grid>
  );
};

export default PersonalInfoList;
