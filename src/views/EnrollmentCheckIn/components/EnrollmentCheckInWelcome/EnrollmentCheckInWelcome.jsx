import { Grid, Typography } from '@mui/material';
import { useUser } from 'hooks/hooks';
import { gordonColors } from 'theme';
// @TODO CSSMODULES - outside directory
import styles from '../../EnrollmentCheckIn.module.css';
import MajorHolds from './components/MajorHolds/MajorHolds';
import MinorHolds from './components/MinorHolds/MinorHolds';

const EnrollmentCheckInWelcome = ({ hasMajorHold, holds }) => {
  const hasMinorHold = holds?.LaVidaHold || holds?.DeclarationOfMajorHold;
  const { profile } = useUser();

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <Grid item>
        <Typography align="center" variant="h5" style={{ color: gordonColors.primary.blue }}>
          <b>Enrollment Check-In</b>
        </Typography>
        <Typography justify="center" className={styles.checkIn}>
          Hello, {profile.FirstName}! Welcome to a new semester at Gordon College! Please take a few
          moments to complete the check-in process in order to confirm your academic enrollment and
          help Gordon College plan to provide services to you.
        </Typography>
        <br />
      </Grid>
      <Grid item>
        {hasMajorHold && <MajorHolds holds={holds} />}
        {holds?.MustRegisterForClasses && ( // If a student is not registered for courses they cannot check in
          <Grid item>
            <Typography variant="h6" align="center" style={{ color: gordonColors.primary.blue }}>
              <b>Register for Courses</b>
            </Typography>
            <Typography align="center" gutterBottom>
              <b>Before you can check in, you must be registered for courses.</b>
            </Typography>
            {holds.NewStudent ? ( // If a student is first year and not registered, display a special prompt
              <Typography>
                You will meet with your advisor during Orientation and he/she can register you. The
                name of your advisor can be found by logging onto{' '}
                <a href="https://my.gordon.edu" className="gc360_text_link">
                  my.gordon.edu
                </a>{' '}
                and clicking on the <b>Student</b> tab. You will see your advisor(s) listed under
                "My Advisors and Majors".
              </Typography>
            ) : (
              // Otherwise display a standard registration prompt
              <Typography gutterBottom>
                Please view the{' '}
                <a href="https://www.gordon.edu/course_schedules" className="gc360_text_link">
                  Course Schedule
                </a>{' '}
                and send an email to <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>{' '}
                with a list of courses you would like to register for.
              </Typography>
            )}
          </Grid>
        )}
        {hasMinorHold && <MinorHolds holds={holds} />}
        <Typography>
          If you are planning to withdraw or take a leave of absence, please contact Student Life at{' '}
          <b>(978)-867-4263</b> or{' '}
          <a href="mailto:studentlife@gordon.edu">studentlife@gordon.edu</a>
        </Typography>
        <br />
      </Grid>
      <Grid item>
        <Typography align="center" variant="h6" style={{ color: gordonColors.primary.blue }}>
          <b>Begin the Check-In Process</b>
        </Typography>
        {hasMajorHold ? ( // If the student has a major hold, display this prompt to resolve them
          <Typography>
            Once you have resolved each of the above holds, click the button below to begin the
            check-in process.
          </Typography>
        ) : holds?.MustRegisterForClasses ? ( // If the student is not registered, display this prompt so they can register
          <Typography>
            Once you have registered for courses and your advisor has approved your registration,
            come back to this page and click the button below to begin the check-in process.
          </Typography>
        ) : (
          // If the student has no major holds and is registered for courses, allow them to begin check in with this message
          <>
            <Typography>Enrollment Check-In consists of four parts: </Typography>
            <ol>
              <li>Enter Your Emergency Contact Information</li>
              <li>Enter Your Cell Phone</li>
              <li>Review Privacy Policies</li>
              <li>Provide your Race and Ethnicity (optional)</li>
            </ol>
            <Typography>Click the button below to begin the check-in process.</Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default EnrollmentCheckInWelcome;
