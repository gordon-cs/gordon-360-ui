import React, { useState, useEffect } from 'react';
import { gordonColors } from 'theme';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Typograph,
  Typography,
} from '@material-ui/core';

const PrivacyAgreement = ({ values, handleCheck }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h5" gutterbottom style={{ color: cyan }}>
          Step 3: Review Privacy Policies
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" gutterbottom align="center">
          This page explains Gordon's policies regarding student privacy. Please click each checkbox
          before continuing with your check-in.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterbottom align="center">
          Notification of Rights Under FERPA
        </Typography>
        <br />
        <Typography variant="body1" gutterbottom>
          The Family Educational Rights and Privacy Act (FERPA) affords students certain rights with
          respect to their education records. They are:
        </Typography>
        <br />
        <Grid item>
          <Typography variant="body1" gutterbottom>
            1. The right to inspect and review the student's education records within 45 days of the
            day the College receives a request for access. Students should submit to the registrar,
            dean, head of the academic department, or other appropriate official, written requests
            that identify the record(s) they wish to inspect. The College official will make
            arrangements for access and notify the student of the time and place where the records
            may be inspected. If the records are not maintained by the College official to whom the
            request was submitted, that official shall advise the student of the correct official to
            whom the request should be addressed.
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            2. The right to request the amendment of the student's education records that the
            student believes are inaccurate or misleading. Students may ask the College to amend a
            record that they believe is inaccurate or misleading. They should write the College
            official responsible for the record, clearly identify the part of the record they want
            changed, and specify why it is inaccurate or misleading. Grades, or an evaluation in
            lieu of grades, cannot be appealed through FERPA.
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            If the College decides not to amend the record as requested by the student, the College
            will notify the student of the decision and advise the student of his or her right to a
            hearing regarding the request for amendment. Additional information regarding the
            hearing procedures will be provided to the student when notified of the right to a
            hearing.
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            3. The right to consent to disclosures of personally identifiable information contained
            in the student’s education records, except to the extent that FERPA authorized
            disclosure without consent. One exception which permits disclosure without consent. One
            exception which permits disclosure without consent is disclosure to school officials
            with legitimate educational interests. A school official is a person employed by the
            College in an administrative, supervisory, academic or research, or support staff
            position (including law enforcement unit personnel and health staff); a person or
            company with whom the College has contracted (such as an attorney, auditor, the National
            student Loan Clearinghouse, or a collection agent); a person serving on the Board of
            Trustees; or a student serving on an official committee, such as a disciplinary or
            grievance committee, or assisting another school official in preforming his or her
            tasks. A school official has a legitimate educational interest if the official needs to
            review an education record in order to fulfill her or her professional responsibility.
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            4. The right to file a complain with the U.S. Department of Education conerncing alleged
            failures by Gordon College to comply with the requirments of FERPA. The name and address
            of the office that administers FERPA is:
          </Typography>
          <br />
          <Typography variant="body2" gutterbottom>
            Family Policy Compliance Office U.S. Department of Education 400 Maryland Avenue, SW
            Washington, DC 20202-8520
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            FERPA permits release of student "directory information" upon inquiry unless the student
            specifically requests, in writing and within the first two weeks of a semester, that the
            College not release such information. Students should be aware that if a FERPA Hold is
            placed on their record, one of the effects will be that information on attendance at the
            College will be suppressed, so that if a loan company, rental agent or prospective
            employer calls to confirm enrollment or degree information, they will be informed that
            we have no record of that person at Gordon College.
          </Typography>
          <Typography variant="subtitle1" gutterbottom>
            Director information is defined as a student's:
          </Typography>
          <Typography variant="body1" gutterbottom>
            <ul>
              <li> name </li> <li>month/day and place of birth </li>
              <li>major field of study</li>
              <li>full- or part-time status </li>
              <li>participation in officially recognized activities and sports </li>
              <li>dates of attendance </li>
              <li>degrees, honors and awards received</li>
              <li>most recent previous education agency or institution attended</li>
              <li>photograph</li>
              <li>weights and heights of members of athletic teams</li>
            </ul>
          </Typography>
          <Typography variant="body2" gutterbottom>
            <b>
              Students may request that their personal photograph not be made available on the
              360.gordon.edu site by accessing 'My Profile' and selecting 'Photo Options' under
              their picture. If you would like all your information blocked by a FERPA Hold, please
              contact the registrar's office at (978) 867-4243 or
              {<a href="mailto:registrar@gordon.edu"> registrar@gordon.edu</a>}.
            </b>
          </Typography>
          <br />
          <FormControl>
            <FormControlLabel
              control={<Checkbox checked={values.FERPA} name="FERPA" onChange={handleCheck} />}
              label="I have read and understand the On-Campus Data Usage paragraph above and I give 
              Gordon College consent to store and process my personal information as outlined in its
              data privacy policy."
              labelPlacement="start"
            />
          </FormControl>
          <br />
          <br />
          <Typography variant="h6" gutterbottom align="center">
            On-Campus Data Usage and Data Privacy Policy
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            Gordon's privacy policy also allows access by on-campus members of the Gordon community
            to current and permanent addresses, telephone listings, email addresses, class schedule,
            listing on course rosters,and photograph. This information, however, should never be
            shared outside the Gordon community. All other personal data is restricted to only
            Gordon faculty, staff and student workers, pursuant to their college respobsibilities,
            or to the contractual agents of the College, such as an attorney, auditor, the National
            Student Loan Clearinghouse or a collection agent.
          </Typography>
          <br />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox checked={values.dataUsage} name="dataUsage" onChange={handleCheck} />
              }
              label="I have read and understand the On-Campus Data Usage paragraph above and I give
            Gordon College consent to store and process my personal information as outline in its
            data privacy policy"
              labelPlacement="start"
            />
          </FormControl>
          <br />
          <br />
          <Typography variant="h6" gutterBottom align="center">
            Generic Campus Photographs
          </Typography>
          <Typography variant="body1">
            Gordon College also arranges for photographs of classes, campus scenes, etc., to be
            taken for use in publications or the web site. The students in these photographs are not
            identified and the photos are simply to represent typical College scenes and events.
            Please check below to indicate that you consent to having your photograph uses in this
            way.
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom>
            <b>
              Students may request that their personal photograph not be made available on the
              360.gordon.edu site by accessing 'My Profile' and selecting 'Photo Options' under
              their picture. If you would like all of your information blocked by a FERPA hold,
              please contact the registrar's office at 978.867.4243 or{' '}
              <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>.
            </b>
          </Typography>
          <br />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.photoConsent}
                  name="photoConsent"
                  onChange={handleCheck}
                />
              }
              label="I have read and understand the On-Campus Data Usage paragraph above and I give
            Gordon College consent to store and process my personal information as outline in its
            data privacy policy"
              labelPlacement="start"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrivacyAgreement;
