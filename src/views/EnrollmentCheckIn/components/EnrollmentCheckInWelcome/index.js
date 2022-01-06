import { Grid, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';
// @TODO CSSMODULES - outside directory
import styles from '../../EnrollmentCheckIn.module.css';

const EnrollmentCheckInWelcome = ({ basicInfo, hasMajorHold, holds }) => {
  const blue = gordonColors.primary.blue;
  console.log(holds);
  const hasMinorHold = holds?.LaVidaHold || holds?.DeclarationOfMajorHold;

  // This function will return the corresponding JSX elements according to the major holds a student
  // has
  const displayMajorHolds = () => {
    let registrationContent;
    let highSchoolContent;
    let financialContent;
    let medicalContent;
    if (holds.RegistrarHold) {
      registrationContent = (
        <>
          <li>
            You have a "Registration Hold". Please contact the Registrar's Office at{' '}
            <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>{' '}
            or visit Jenks 216. )
          </li>
          <br />
        </>
      );
    }
    if (holds.HighSchoolTranscriptHold) {
      highSchoolContent = (
        <>
          <li>
            You have a "High School Transcript Hold". Please contact the Registrar's Office at{' '}
            <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>{' '}
            or visit Jenks 216.
          </li>
          <br />
        </>
      );
    }
    if (holds.FinancialHold) {
      financialContent = (
        <>
          <li>
            You have a "Financial Hold". Please visit Student Financial Services in MacDonald 205.
          </li>
          <br />
        </>
      );
    }
    if (holds.MedicalHold) {
      medicalContent = (
        <>
          <li>
            You have a "Medical Hold". Please contact the Health Center at <b>(978)-867-4300</b> or{' '}
            <a href="mailto:healthcenter@gordon.edu">healthcenter@gordon.edu</a> or visit Lane 135.{' '}
          </li>
          <br />
        </>
      );
    }
    return (
      <ul>
        {registrationContent} {highSchoolContent} {financialContent} {medicalContent}
      </ul>
    );
  };

  // This function will return the corresponding JSX elements according to the minor holds a student
  // has
  const displayMinorHolds = () => {
    let laVidaContent;
    let declarationOfMajorContent;
    if (holds.LaVidaHold) {
      laVidaContent = (
        <li>
          You have a "La Vida Hold". Students are required to complete Discovery or La Vida in their
          first year at Gordon College. Please come to the registrar's office (Jenks 216) so that we
          can register you for Discovery or La Vida.
        </li>
      );
    }
    if (holds.MajorHold) {
      declarationOfMajorContent = (
        <li>
          You have a "Declaration of Major Hold". Please contact the <b>Registrar's Office</b> at{' '}
          <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a> or
          visit Jenks 216 to discuss declaring a major.
        </li>
      );
    }
    return (
      <ul>
        {laVidaContent} <br /> {declarationOfMajorContent}
      </ul>
    );
  };

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column">
      <Grid item>
        <Typography align="center" variant="h5" style={{ color: blue }}>
          <b>Enrollment Check-In</b>
        </Typography>
        <Typography justify="center" className={styles.checkIn}>
          Hello, {basicInfo.studentFirstName}! Welcome to a new semester at Gordon College! Please
          take a few moments to complete the check-in process in order to confirm your academic
          enrollment and help Gordon College plan to provide services to you.
        </Typography>
        <br />
      </Grid>
      <Grid item>
        {hasMajorHold && ( // If the student has a major hold, they cannot check in
          <Grid item>
            <Typography style={{ color: blue }} align="center" variant="h6">
              <b>Review Your Holds</b>
            </Typography>
            <Typography align="center">
              According to our systems, you should contact the following department(s) in order to
              clear up certain administrative holds before beginning the check-in process.
            </Typography>
            {displayMajorHolds()}
          </Grid>
        )}
        {holds?.MustRegisterForClasses && ( // If a student is not registered for courses they cannot check in
          <Grid item>
            <Typography variant="h6" align="center" style={{ color: blue }}>
              <b>Register for Courses</b>
            </Typography>
            <Typography align="center" gutterBottom>
              <b>Before you can check in, you must be registered for courses.</b>
            </Typography>
            {holds.NewStudent ? ( // If a student is first year and not registered, display a special prompt
              <Typography>
                You will meet with your advisor during Orientation and he/she can register you. The
                name of your advisor can be found by logging onto{' '}
                <a href="https://my.gordon.edu">my.gordon.edu</a> and clicking on the <b>Student</b>{' '}
                tab. You will see your advisor(s) listed under "My Advisors and Majors".
              </Typography>
            ) : (
              // Otherwise display a standard registration prompt
              <Typography gutterBottom>
                Register online at <a href="https://my.gordon.edu">my.gordon.edu</a> anytime between
                8AM on January 11, 2022 and 11:59PM on January 19, 2022.
              </Typography>
            )}
          </Grid>
        )}
        {hasMinorHold && ( // If a student has a minor hold, warn them about it
          <Grid item>
            <Typography>
              Even though you can still check in while maintaining the following holds, you should
              contact the following department(s) at your earliest availability:
            </Typography>
            {displayMinorHolds()}
          </Grid>
        )}
        <Typography>
          If you are planning to withdraw or take a leave of absence, please contact Student Life at{' '}
          <b>(978)-867-4263</b> or{' '}
          <a href="mailto:studentlife@gordon.edu">studentlife@gordon.edu</a>
        </Typography>
        <br />
      </Grid>
      <Grid item>
        <Typography align="center" variant="h6" style={{ color: blue }}>
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
