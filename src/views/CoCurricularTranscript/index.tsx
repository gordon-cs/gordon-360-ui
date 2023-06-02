import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Fab, Grid, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import transcriptService, { TranscriptItems } from 'services/transcript';
import userService, { Profile } from 'services/user';
import { MembershipHistory, MembershipHistorySession } from 'services/user';
import BaseProfileInfo from 'services/user';
import OnOffCampusStatus, {
  StudentProfileInfo,
  UnformattedStudentProfileInfo,
} from 'services/user';
import { Class } from 'services/peopleSearch';
import { Participation } from 'services/membership';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/Activity';
import Experience from './Components/Experience';

const SectionTitle: { [Key in keyof TranscriptItems]: string } = {
  experiences: 'Experiences',
  activities: 'Activities',
  honors: 'Honors, Leadership, and Research',
  service: 'Service Learning',
};

const CoCurricularTranscript = () => {
  const [loading, setLoading] = useState(true);
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItems | undefined>();
  let { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadTranscript = async () => {
      if (!profile) return;

      setLoading(true);

      await transcriptService.getItems(profile.AD_Username).then(setTranscriptItems);

      setLoading(false);
    };

    loadTranscript();
  }, [profile]);

  if (loadingProfile) {
    return <GordonLoader />;
  }
  console.log(new Date('2023-05-07T00:00:00').getTime());
  if (!profile) {
    const participation1: Participation = Participation.Member;
    const session1: MembershipHistorySession = {
      MembershipID: 2904,
      SessionCode: '202301',
      Participation: participation1,
    };
    const activity1: MembershipHistory = {
      ActivityCode: 'ISO',
      ActivityDescription: 'International Student Organization',
      ActivityImagePath: '',
      Sessions: [session1],
      LatestDate: '2023-05-10T00:00:00',
    };
    const participation2: Participation = Participation.Member;
    const session2: MembershipHistorySession = {
      MembershipID: 6547,
      SessionCode: '202309',
      Participation: participation2,
    };
    const activity2: MembershipHistory = {
      ActivityCode: '360',
      ActivityDescription: '360.gordon.edu',
      ActivityImagePath: '',
      Sessions: [session2],
      LatestDate: '2023-12-15T00:00:00',
    };
    const transcriptItems1: TranscriptItems = {
      honors: [],
      experiences: [],
      service: [],
      activities: [activity1, activity2],
    };
    console.log(transcriptItems1);
    if (transcriptItems == null) setTranscriptItems(transcriptItems1);
    const student1: StudentProfileInfo = {
      fullName: 'Emmanuel Obrien',
      Majors: ['Computer Science'],
      Minors: [],
      Advisors: [],
      ID: '50232456',
      Title: '',
      FirstName: 'First',
      MiddleName: '',
      LastName: 'Last',
      Suffix: '',
      MaidenName: '',
      NickName: '',
      OnCampusBuilding: 'WIL',
      OnCampusRoom: '320',
      OnCampusPhone: '',
      OnCampusPrivatePhone: '',
      OnCampusFax: '',
      Mail_Location: '778',
      HomeStreet1: '255 Grapevine Rd',
      HomeStreet2: '',
      HomeCity: 'Wenham',
      HomeState: 'MA',
      HomePostalCode: '',
      HomeCountry: 'AM',
      HomePhone: '',
      HomeFax: '',
      KeepPrivate: '',
      Barcode: '72639526863451',
      Email: 'first.last@gordon.edu',
      Gender: 'F',
      AD_Username: 'first.last',
      show_pic: 0,
      preferred_photo: 0,
      Country: 'America',
      BuildingDescription: 'Wilson Hall',
      Facebook: '',
      Twitter: '',
      Instagram: '',
      Handshake: '',
      LinkedIn: '',
      Calendar: '',
      PersonType: 'stu',
      CliftonStrengths: null,
      OnOffCampus: 'On Campus',
      OffCampusStreet1: '',
      OffCampusStreet2: '',
      OffCampusCity: '',
      OffCampusState: '',
      OffCampusPostalCode: '',
      OffCampusCountry: '',
      OffCampusPhone: '',
      OffCampusFax: '',
      Cohort: '2023',
      Class: Class['First Year'],
      Major: 'CPSC',
      AdvisorIDs: '',
      /** Whether student is married or not ('Y' or 'N') */
      Married: 'N',
      /** Whether student ia commuter or not ('Y' or 'N') */
      Commuter: 'N',
      Major2: '',
      /** Whether student is a graduate student or not ('Y' or 'N') */
      grad_student: 'N',
      GradDate: '',
      Major3: '',
      Minor1: '',
      Minor2: '',
      Minor3: '',
      MobilePhone: '123-456-7890',
      IsMobilePhonePrivate: 0,
      Major1Description: 'Computer Science',
      Major2Description: '',
      Major3Description: '',
      Minor1Description: '',
      Minor2Description: '',
      Minor3Description: '',
      ChapelRequired: 0,
      ChapelAttended: 0,
    };
    profile = student1;
  }

  console.log(profile);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={10} xl={8}>
        <Card elevation={10}>
          <CardHeader
            title={
              <Typography component="h1" variant="h4">
                Gordon College Experience Transcript
              </Typography>
            }
            subheader={<SubHeader profile={profile} />}
            disableTypography
          />
          <CardContent>
            {transcriptItems &&
              Object.entries(transcriptItems).map(
                ([key, items]) =>
                  items.length > 0 && (
                    <>
                      <Typography variant="h6" component="h2">
                        <b>{SectionTitle[key as keyof TranscriptItems]}</b>
                      </Typography>
                      {items.map((activity) =>
                        'Sessions' in activity ? (
                          <Activity
                            key={activity.ActivityCode}
                            sessions={activity.Sessions}
                            description={activity.ActivityDescription}
                          />
                        ) : (
                          <Experience
                            Experience={activity}
                            key={activity.Job_Title + activity.Job_Start_Date}
                          />
                        ),
                      )}
                    </>
                  ),
              )}
          </CardContent>
        </Card>
        <Fab
          color="primary"
          variant="extended"
          className={`${styles.fab} ${styles.no_print}`}
          onClick={() => window.print()}
        >
          <Print />
          Print
        </Fab>
      </Grid>
    </Grid>
  );
};

const SubHeader = ({ profile }: { profile: Profile }) => (
  <>
    <Typography component="p" variant="h6">
      {profile.fullName}
    </Typography>
    {userService.isStudent(profile) && (
      <>
        {profile.GradDate && (
          <Typography component="p" variant="h6">
            Class of {transcriptService.getGradCohort(profile.GradDate)}
          </Typography>
        )}
        {profile.Majors.length > 0 && (
          <Typography component="p" variant="h6">
            Major{profile.Majors.length > 1 ? 's' : ''}: {profile.Majors.join(', ')}
          </Typography>
        )}
        {profile.Minors.length > 0 && (
          <Typography component="p" variant="h6">
            Minor{profile.Minors.length > 1 ? 's' : ''}: {profile.Minors.join(', ')}
          </Typography>
        )}
      </>
    )}
  </>
);

export default CoCurricularTranscript;
