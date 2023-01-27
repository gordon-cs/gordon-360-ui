import { useIsAuthenticated } from '@azure/msal-react';
import { Print } from '@mui/icons-material';
import { Button, Card, CardContent, Fab, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { Component } from 'react';
import membershipService, { NonGuestParticipations } from 'services/membership';
import transcriptService from 'services/transcript';
import user from 'services/user';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';

//This component creates the overall interface for the CoCurricularTranscript (card, heading,
//download button), and contains a InvolvementsList object for displaying the content

// TODO: Temporary fix until IDUploader is a function component and can use hooks.
const withAuth = () => (WrappedComponent) => (props) => {
  const isAuthenticated = useIsAuthenticated();
  return <WrappedComponent {...props} authentication={isAuthenticated} />;
};
class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorizedMemberships: {},
      loading: true,
      profile: {},
      otherInvolvements: false,
      honorsLeadership: false,
      serviceLearning: false,
      experiences: false,
    };
  }

  componentDidMount() {
    if (this.props.authentication) {
      this.loadTranscript();
    }
  }

  async loadTranscript() {
    this.setState({ loading: true });
    try {
      /* Retrieve data from server */
      const profile = await user.getProfileInfo();

      this.setState({ profile });

      const memberships = await membershipService.get({
        username: profile.AD_Username,
        participationTypes: NonGuestParticipations,
      });
      const categorizedMemberships = transcriptService.filterMemberships(memberships);

      const otherInvolvements = categorizedMemberships.activities.length > 0;
      const honorsLeadership = categorizedMemberships.honors.length > 0;
      const serviceLearning = categorizedMemberships.service.length > 0;

      categorizedMemberships.experience.employments = await user.getEmploymentInfo();

      const experiences =
        categorizedMemberships.experience.experiences.length > 0 ||
        categorizedMemberships.experience.employments.length > 0;

      this.setState({
        loading: false,
        categorizedMemberships,
        profile,
        otherInvolvements,
        honorsLeadership,
        serviceLearning,
        experiences,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  // Returns: the graduation date of the current user, or nothing if they have no declared grad date
  getGradCohort() {
    let gradDate = this.state.profile.GradDate;
    if (!gradDate) {
      return null;
    } else {
      return 'Class of ' + gradDate.split(' ')[3];
    }
  }

  render() {
    if (!this.props.authentication) {
      return <GordonUnauthorized feature={'your experience transcript'} />;
    }

    const activityList = !this.state.categorizedMemberships.activities ? (
      <GordonLoader />
    ) : (
      transcriptService
        .groupActivityByCode(this.state.categorizedMemberships.activities)
        .map((activity) => <Activity {...activity} />)
    );

    const honorsList = !this.state.categorizedMemberships.honors ? (
      <GordonLoader />
    ) : (
      transcriptService
        .groupActivityByCode(this.state.categorizedMemberships.honors)
        .map((activity) => <Activity {...activity} />)
    );

    const serviceList = !this.state.categorizedMemberships.service ? (
      <GordonLoader />
    ) : (
      transcriptService
        .groupActivityByCode(this.state.categorizedMemberships.service)
        .map((activity) => <Activity {...activity} />)
    );

    const experienceList = !this.state.categorizedMemberships.experience ? (
      <GordonLoader />
    ) : (
      transcriptService
        .groupActivityByCode(this.state.categorizedMemberships.experience.experiences)
        .map((activity) => <Activity {...activity} />)
        .concat(
          this.state.categorizedMemberships.experience.employments
            .map((employment) => <Experience Experience={employment} />)
            .reverse(),
        )
    );

    const honorsLeadership = this.state.honorsLeadership;
    const experiences = this.state.experiences;
    const serviceLearning = this.state.serviceLearning;
    const otherInvolvements = this.state.otherInvolvements;

    return (
      <div className={styles.co_curricular_transcript}>
        <Card className={styles.card} elevation={10}>
          <CardContent className={styles.card_content}>
            <div>Gordon College Experience Transcript</div>
            <div className={styles.subtitle}>
              <b>{this.state.profile.fullName}</b>
            </div>
            {this.state.profile.GradDate && (
              <div className={styles.subtitle}>
                Class of {transcriptService.getGradCohort(this.state.profile.GradDate)}
              </div>
            )}
            {this.state.profile.Majors && (
              <div className={styles.subtitle}>
                Major{this.state.profile.Majors.length > 1 ? 's' : ''}:{' '}
                {this.state.profile.Majors.join(', ')}
              </div>
            )}
            {this.state.profile.Majors && (
              <div className={styles.subtitle}>
                Minor{this.state.profile.Minors.length > 1 ? 's' : ''}:{' '}
                {this.state.profile.Minors.join(', ')}
              </div>
            )}
            {honorsLeadership && (
              <div className={styles.subtitle}>
                <Typography variant="h5">
                  <b>Honors, Leadership, and Research</b>
                </Typography>
              </div>
            )}
            <div className={styles.activity_list}>{honorsList}</div>
            {experiences && (
              <div className={styles.subtitle}>
                <Typography variant="h5">
                  <b>Experience</b>
                </Typography>
              </div>
            )}
            <div className={styles.activity_list}>{experienceList}</div>
            {serviceLearning && (
              <div className={styles.subtitle}>
                <Typography variant="h5">
                  <b>Service Learning</b>
                </Typography>
              </div>
            )}
            <div className={styles.activity_list}>{serviceList}</div>
            {otherInvolvements && (
              <div className={styles.subtitle}>
                <Typography variant="h5">
                  <b>Activities</b>
                </Typography>
              </div>
            )}
            <div className={styles.activity_list}>{activityList}</div>
          </CardContent>
        </Card>
        <Fab
          color="primary"
          variant="extended"
          className={styles.fab}
          onClick={() => window.print()}
        >
          <Print />
          Print
        </Fab>
      </div>
    );
  }
}

export default withAuth()(Transcript);
