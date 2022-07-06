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
import { useEffect, useMemo, useState } from 'react';
import { AuthGroup } from 'services/auth';
import userService from 'services/user';
import { gordonColors } from 'theme';
import ProfileInfoListItem from '../ProfileInfoListItem';
import UpdatePhone from './components/UpdatePhoneDialog/index.js';
import styles from './PersonalInfoList.module.css';

const PRIVATE_INFO = 'Private as requested.';

const formatPhone = (phone) => {
  if (phone?.length === 10) {
    return `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6)}`;
  } else {
    return phone;
  }
};

const PersonalInfoList = ({
  myProf,
  profile: {
    Advisors,
    CliftonStrengths,
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
    PreferredClassYear,
    SpouseName,
  },
  createSnackbar,
}) => {
  const [isMobilePhonePrivate, setIsMobilePhonePrivate] = useState(
    Boolean(IsMobilePhonePrivate && MobilePhone !== PRIVATE_INFO),
  );
  const [mailCombo, setMailCombo] = useState();
  const [showMailCombo, setShowMailCombo] = useState(false);
  const isOnline = useNetworkStatus();
  const groups = useAuthGroups();
  const isStudent = PersonType?.includes('stu');
  const isFacStaff = PersonType?.includes('fac');
  const isAlumni = PersonType?.includes('alu');
  const isViewerPolice = useMemo(() => groups.some((g) => g === AuthGroup.Police), [groups]);

  // KeepPrivate has different values for Students and FacStaff.
  // Students: null for public, 'S' for semi-private (visible to other students, some info redacted)
  //    or 'P' for Private (not visible to other students)
  // FacStaff: '0' for public, '1' for private.
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
  const [isHomePhonePrivate, setIsHomePhonePrivate] = useState(
    (isStudent || keepPrivate) && Boolean(HomePhone),
  );

  // Street address info is always private, and City/State/Country info is private for private users
  const isAddressPrivate = (keepPrivate && HomeCity !== PRIVATE_INFO) || HomeStreet2;

  // FacStaff spouses are private for private users
  const isSpousePrivate = isFacStaff && keepPrivate && SpouseName !== PRIVATE_INFO;

  useEffect(() => {
    async function loadMailboxCombination() {
      if (myProf && isStudent) {
        const info = await userService.getMailboxCombination();
        setMailCombo(info.Combination);
      }
    }
    loadMailboxCombination();
  }, [myProf, Mail_Location, isStudent]);

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

  const homePhoneListItem = HomePhone ? (
    <ProfileInfoListItem
      title="Home Phone:"
      contentText={
        myProf ? (
          formatPhone(HomePhone)
        ) : (
          <a href={`tel:${HomePhone}`} className="gc360_text_link">
            {formatPhone(HomePhone)}
          </a>
        )
      }
      privateInfo={isHomePhonePrivate}
      myProf={myProf}
    />
  ) : null;

  const mobilePhoneListItem = MobilePhone ? (
    <ProfileInfoListItem
      title="Mobile Phone:"
      contentText={
        myProf ? (
          <Grid container spacing={0} alignItems="center">
            <Grid item>{formatPhone(MobilePhone)}</Grid>
            <Grid item>
              <UpdatePhone />
            </Grid>
          </Grid>
        ) : MobilePhone === PRIVATE_INFO ? (
          PRIVATE_INFO
        ) : (
          <a href={`tel:${MobilePhone}`} className="gc360_text_link">
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
      privateInfo={isMobilePhonePrivate}
      myProf={myProf}
    />
  ) : null;

  let streetAddr = HomeStreet2 ? <span>{HomeStreet2},&nbsp;</span> : null;

  const home = (
    <ProfileInfoListItem
      title="Home:"
      contentText={
        <>
          {streetAddr}
          <span className={keepPrivate ? null : styles.not_private}>
            {HomeCity === PRIVATE_INFO
              ? PRIVATE_INFO
              : Country === 'United States of America' || !Country
              ? `${HomeCity}, ${HomeState}`
              : Country}
          </span>
        </>
      }
      privateInfo={isAddressPrivate}
      myProf={myProf}
    />
  );

  const minors =
    Minors?.length > 0 && !isFacStaff ? (
      <ProfileInfoListItem
        title={Minors?.length > 1 ? 'Minors:' : 'Minor:'}
        contentText={Minors?.join(', ')}
      />
    ) : null;

  const majors =
    isFacStaff || (isAlumni && !Majors?.length) ? null : (
      <ProfileInfoListItem
        title={Majors?.length > 1 ? 'Majors:' : 'Major:'}
        contentText={!Majors?.length ? 'Deciding' : Majors?.join(', ')}
      />
    );

  const updateInfoButton =
    myProf && PersonType === 'alu' ? (
      <Grid container justifyContent="center">
        <Link className="gc360_link" to="/myprofile/update">
          <Button variant="contained" className={styles.update_info_button}>
            Update Information
          </Button>
        </Link>
      </Grid>
    ) : null;

  const graduationYear = isAlumni ? (
    <ProfileInfoListItem title={'Graduation Year:'} contentText={PreferredClassYear} />
  ) : null;

  const cliftonStrengths = CliftonStrengths.length ? (
    <ProfileInfoListItem
      title="Clifton Strengths:"
      contentText={
        <Typography>
          {CliftonStrengths.map((strength) => (
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
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const mail =
    isStudent && Mail_Location ? (
      <>
        <ListItem className={styles.profile_info_list_item}>
          <Grid container justify="center" alignItems="center">
            <Grid container item xs={5} alignItems="center">
              <Typography>{'Mailbox:'}</Typography>
            </Grid>
            <Grid container item xs={myProf && mailCombo ? 2 : 7} alignItems="center">
              <Typography>{`#${Mail_Location}`}</Typography>
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
    isStudent && OnOffCampus && !(BuildingDescription || Hall) ? (
      <ProfileInfoListItem
        title="Dormitory:"
        contentText={OnOffCampus}
        private={isCampusLocationPrivate}
        myProf={myProf}
      />
    ) : isStudent ? (
      <ProfileInfoListItem
        title="Dormitory:"
        contentText={
          <>
            <span className={keepPrivate ? null : styles.not_private}>
              {BuildingDescription ?? Hall}
            </span>
            {(myProf || isViewerPolice) && OnCampusRoom && `, Room ${OnCampusRoom}`}
          </>
        }
        privateInfo
        myProf={myProf}
      />
    ) : null;

  const gordonID = myProf ? (
    <ProfileInfoListItem
      title="Gordon ID:"
      contentText={ID}
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
    isFacStaff && SpouseName ? (
      <ProfileInfoListItem
        title="Spouse:"
        contentText={SpouseName}
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
          {updateInfoButton}
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
    </Grid>
  );
};

export default PersonalInfoList;
