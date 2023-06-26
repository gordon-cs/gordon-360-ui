import styles from './Help.module.css';

import { Typography, Grid, Button, Card, CardHeader, CardContent } from '@mui/material';

const Help = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card className={styles.help}>
          <CardHeader
            className={styles.help_title}
            title="Gordon 360 Help"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="Login Instructions" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>Username: 'firstname.lastname' or your Gordon email address</li>
                  <li>Password: Your Gordon College account password</li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="Site Navigation" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    <strong>Home</strong> &ndash; Contains various tiles with charts or information.
                    <Typography variant="body1" component="ul">
                      <li>
                        <strong>Student:</strong> Includes your Dining “Meal Wheel’ tracker synced
                        to days remaining in the semester and your Christian Life & Worship (CL&W)
                        credits. You can click on the CL&W tracker to see which events are recorded
                        for you.
                      </li>
                      <li>
                        <strong>Faculty/Staff:</strong> Includes days remaining wheel and a separate
                        Dining Dollars tracker.
                      </li>
                    </Typography>
                  </li>
                  <li>
                    <strong>Involvements</strong> &ndash; A list of available groups, clubs and
                    organizations for the current Academic Session. Change Academic Sessions in the
                    drop down menu to view involvements in other sessions. You can view your pending
                    join requests for Involvements you’ve requested, as well as the requests that
                    are pending for you approve if you are a Group Leader/Advisor.
                  </li>
                  <li>
                    <strong>Events</strong> &ndash; A live list of events drawn from the campus
                    master calendar including CL&W events. You can search by event name, location
                    and/or time. Use the filters to narrow your search (including CL&W events if you
                    are looking for more).
                  </li>
                  <li>
                    <strong>People</strong> &ndash; Allows searching the campus community with more
                    in-depth filters than the normal search bar. You can filter students, staff, and
                    faculty by name or hall and by academic, home, and office info.
                  </li>
                  <li>
                    <strong>Quick Search</strong> &ndash; Quick searches by name of Gordon students,
                    faculty and staff. Just first name or last name is needed.
                  </li>
                  <li>
                    <strong>My Profile</strong> &ndash; Shows your own personal information –
                    Student ID, current official ID photo and current personal photo (changeable),
                    current and past involvements, other trackers and information, and your
                    Experience Transcript (ET). Your ET displays a collection of your Honors and
                    Leadership, Experience (work/jobs), Service Learning, and your Activities and
                    Clubs in a resume-like format. You can also add links to your Social Media for
                    others to connect with you in the My Profile photo section. On Mobile, access My
                    Profile through the Navigation Drawer (three-line stack) or on Desktop by
                    clicking your profile navitar picture on the top right of the navbar. Some
                    settings have toggles to leave information public, or make it private. To view
                    what others see about you, use the View My Public Profile feature near your
                    photo on your My Profile view. For students, some key institutional contact
                    information will remain visible to faculty and staff even if you make it private
                    for student viewers. If you have a situation that requires additional privacy or
                    security, please contact CTS,&nbsp;
                    <a href="mailto:360@gordon.edu" className={styles.help_link}>
                      360@gordon.edu
                    </a>
                    , or the Registrar.
                  </li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="Involvement User Levels" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    <strong>Subscriber</strong> &ndash; Subscribers will receive Group emails. The
                    Involvement will not appear on their Experience Transcript.
                  </li>
                  <li>
                    <strong>Member</strong> &ndash; Members appear on the roster and can see other
                    Members and Subscribers (Guests). Members receive group emails and have their
                    role recorded in Memberships on the Experience Transcript, with a position
                    title, if added.
                  </li>
                  <li>
                    <strong>Leader</strong> &ndash; Leaders appear on the roster with a title and
                    with all the same privileges and Members. Leadership appears on Experience
                    Transcript view and Official Experience Transcript, with their position title.
                  </li>
                  <li>
                    <strong>Advisor</strong> &ndash; Faculty or Staff Advisor have the same
                    privileges as Leaders. It is recommended to give an Advisor a position title for
                    the Roster.
                  </li>
                  <li>
                    <strong>Admin</strong> &ndash; Admins can manage all Subscribers, Members and
                    Leaders in the Involvement. They can also manage join requests, Send Group
                    Email, and Edit the Involvement Information (photo, web link, description,
                    etc.). Admin privileges can be granted to Members of any type.
                  </li>
                  <li>
                    <strong>Super-Admin</strong> &ndash; Super-Admins have admin privileges for all
                    Involvements, regardless if they have been added as Members. This is an
                    administrative role for program and department staff, responsible for multiple
                    Involvements.
                  </li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader
                className={styles.help_header}
                title="Management & Editing Involvements"
              />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    <strong>Group Email</strong> &ndash; Leaders/Advisors can email the full roster
                    of Members, plus any Subscribers to their Communications feed. Allows direct
                    connection emails.
                  </li>
                  <li>
                    <strong>Subscriber</strong> &ndash; Subscribers receive the email feed from
                    their Leader or Advisor &ldquo;Email Group&rdquo; function. Subscribers cannot
                    see Members on the Roster, but can see Involvement Information.
                  </li>
                  <li>
                    <strong>Managing Requests</strong> &ndash; To manager a Subscriber or Membership
                    request, go to the home page, or open the Involvement you Lead/Advise. New
                    requests appear at the top of the roster. To modify a request to a different
                    user level, use the dropdown menu (Advisor, Leader, Member, Subscriber) to
                    assign a different level. Add an appropriate position title for Leaders and
                    Advisors. You can add a title to other users as well.
                  </li>
                  <li>
                    <strong>Title/Comment</strong> &ndash; Short but descriptive job or role title
                    that will appear on the Roster and the Experience Transcript. Helps manage roles
                    in large rosters. Recommended for Leader and Advisors, can be used for anyone.
                    These are public and appear as a detail for the Official Experience Transcript!
                  </li>
                  <li>
                    <strong>Web link</strong> &ndash; Link to an Involvement&apos;s web page for
                    more information.
                  </li>
                  <li>
                    <strong>Description</strong> &ndash; Recommended 1-2 sentence Involvement
                    description, and place for updating meeting times and locations for Involvement
                    seekers, Subscribers, and Members.
                  </li>
                  <li>
                    <strong>Involvement Image</strong> &ndash; 72DPI, no larger than 320x320 pixels
                    and 100KB or less. Recommend a square image for clearest quality. Default image
                    will fill where there is no Image loaded.
                  </li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="Issues & Troubleshooting" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    <a
                      href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug"
                      className={styles.help_link}
                    >
                      Contact CTS
                    </a>
                    &nbsp;for issues using the portal on your device, or for login issues, or any
                    peculiar behaviors.
                  </li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="Supported Platforms" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    Gordon 360 has been successfully tested on Windows (Edge, Firefox, Chrome), Mac
                    (Safari, Firefox, Chrome), and on Android and iPhone default browsers.
                  </li>
                  <li>Gordon 360 is not supported on Internet Explorer.</li>
                </Typography>
              </CardContent>
            </Card>

            <Card className={styles.help_section}>
              <CardHeader className={styles.help_header} title="FAQ" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>
                    <strong>Do I have to rejoin an Involvement each semester?</strong> Yes. This
                    allows each student to control their participation in Involvements for their
                    Experience Transcript. Student Leaders and Advisors can ADD members and guests
                    too! Some may do this to help maintain their team roster.
                  </li>
                  <li>
                    <strong>
                      What&apos;s the difference between subscribing to, and joining an Involvement?{' '}
                    </strong>
                    Subscribing to an Involvement allows you to receive emails from the Involvement,
                    but not to view other members of the Involvement. Joining a Involvement means
                    you're an active member of the Involvement. You can view other members in the
                    Involvement in addition to getting group emails.
                  </li>
                  <li>
                    <strong>What if I leave an Involvement?</strong> Subscribership and Membership
                    are fluid during an academic session, and are confirmed at the conclusion of a
                    session. You can come and go over the semester, and your Membership will move to
                    your official Experience Transcript only at the end of the semester.
                  </li>
                  <li>
                    <strong>
                      What if I am in an Involvement I don&apos;t want to be part of?{' '}
                    </strong>
                    No problem. Contact the Involvement leaders or advisor and they will be able to
                    remove you from the list.
                  </li>
                  <li>
                    <strong>
                      I&apos;m an alumna or alumnus. Why do I not see the join button anymore?{' '}
                    </strong>
                    We apologize, but alumni cannot join new Involvements. You could still subscribe
                    to Involvements to receive emails!
                  </li>
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Typography variant="subtitle1" className={styles.help_section} gutterBottom>
          <br /> Found a bug?
          <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
            <Button color="primary">Report to CTS</Button>
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Help;
