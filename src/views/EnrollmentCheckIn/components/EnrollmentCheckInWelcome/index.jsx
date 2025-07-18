import { Grid, Typography } from '@mui/material';
import React from 'react';

const EnrollmentCheckInWelcome = ({ hasMajorHold, holds }) => {
  const hasMinorHold = holds?.LaVidaHold || holds?.DeclarationOfMajorHold;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>
          Welcome to a new semester at Gordon College! Please take a few moments to complete the
          check-in process in order to confirm your academic enrollment and help Gordon College plan
          to provide services to you.
        </Typography>
      </Grid>
      {hasMajorHold && (
        <Grid item>
          <Typography align="center" variant="h5" component="h2">
            Review Your Holds
          </Typography>
          <Typography align="center">
            According to our systems, you should contact the following department(s) in order to
            clear up certain administrative holds before beginning the check-in process.
          </Typography>
          <ul>
            {holds?.RegistrarHold && (
              <li>
                You have a "Registration Hold". Please contact the Registrar's Office at{' '}
                <a href="tel:+19788674243" className="gc360_text_link">
                  (978) 867-4243
                </a>{' '}
                or{' '}
                <a href="mailto:registrar@gordon.edu" className="gc360_text_link">
                  registrar@gordon.edu
                </a>
              </li>
            )}
            {holds?.HighSchoolTranscriptHold && (
              <li>
                You have a "High School Transcript Hold". Please contact the Registrar's Office at{' '}
                <a href="tel:+19788674243" className="gc360_text_link">
                  (978) 867-4243
                </a>{' '}
                or{' '}
                <a href="mailto:registrar@gordon.edu" className="gc360_text_link">
                  registrar@gordon.edu
                </a>
              </li>
            )}
            {holds?.FinancialHold && (
              <li>
                You have a "Financial Hold". Please contact Student Financial Services at{' '}
                <a href="tel:+19788674246" className="gc360_text_link">
                  (978) 867-4246
                </a>{' '}
                or{' '}
                <a href="sfs@gordon.edu" className="gc360_text_link">
                  sfs@gordon.edu
                </a>
                .
              </li>
            )}
            {holds?.MedicalHold && (
              <li>
                You have a "Medical Hold". Please contact the Health Center at{' '}
                <a href="tel:+19788674300" className="gc360_text_link">
                  (978)-867-4300
                </a>{' '}
                or{' '}
                <a href="mailto:healthcenter@gordon.edu" className="gc360_text_link">
                  healthcenter@gordon.edu
                </a>
                .
              </li>
            )}
          </ul>
        </Grid>
      )}
      {holds?.MustRegisterForClasses && ( // If a student is not registered for courses they cannot check in
        <Grid item>
          <Typography variant="h5" component="h2">
            Register for Courses
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
              and clicking on the <b>Student</b> tab. You will see your advisor(s) listed under "My
              Advisors and Majors".
            </Typography>
          ) : (
            // Otherwise display a standard registration prompt
            <Typography gutterBottom>
              Please view the{' '}
              <a href="https://www.gordon.edu/course_schedules" className="gc360_text_link">
                Course Schedule
              </a>{' '}
              and send an email to{' '}
              <a href="mailto:registrar@gordon.edu" className="gc360_text_link">
                registrar@gordon.edu
              </a>{' '}
              with a list of courses you would like to register for.
            </Typography>
          )}
        </Grid>
      )}
      {hasMinorHold && (
        <Grid item>
          <Typography>
            Even though you can still check in while maintaining the following holds, you should
            contact the following department(s) at your earliest availability:
          </Typography>
          <ul>
            {holds?.LaVidaHold && (
              <li>
                You have a "La Vida Hold". Students are required to complete Discovery or La Vida in
                their first year at Gordon College. Please contact the Registrar's Office at{' '}
                <a href="tel:+19788674243" className="gc360_text_link">
                  (978) 867-4243
                </a>{' '}
                or{' '}
                <a href="registrar@gordon.edu" className="gc360_text_link">
                  registrar@gordon.edu
                </a>{' '}
                so that we can register you for Discovery or La Vida.
              </li>
            )}
            {holds?.MajorHold && (
              <li>
                You have a "Declaration of Major Hold". Please contact the <b>Registrar's Office</b>{' '}
                at{' '}
                <a href="tel:+19788674243" className="gc360_text_link">
                  (978) 867-4243
                </a>{' '}
                or{' '}
                <a href="mailto:registrar@gordon.edu" className="gc360_text_link">
                  registrar@gordon.edu
                </a>{' '}
                to discuss declaring a major.
              </li>
            )}
          </ul>
        </Grid>
      )}
      <Grid item>
        <Typography>
          If you are planning to withdraw or take a leave of absence, please contact Student Life at{' '}
          <a href="tel:+19788674263" className="gc360_text_link">
            (978) 867-4263
          </a>{' '}
          or{' '}
          <a href="mailto:studentlife@gordon.edu" className="gc360_text_link">
            studentlife@gordon.edu
          </a>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h2">
          Begin the Check-In Process
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
