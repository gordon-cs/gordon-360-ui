import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { gordonColors } from '../../theme';
import './help.css';

export default class Help extends Component {
  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
    return (
      <section>
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} md={12} lg={8}>
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    LOGIN
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>Firstname.Lastname or Gordon email address</li>
              <li>Normal Gordon password</li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    SITE NAVIGATION
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                <strong>Home</strong> &ndash; Contains a chart displaying the number of days left in
                the current semester, alongside the number of Christian Life &amp; Worship Credits
                you have earned this semester. This chart can be clicked to view the CL&amp;W events
                you have attended. You can also view your pending requests to join Involvements, as
                well as requests to join your club, if you are a leader.
              </li>
              <li>
                <strong>Involvements</strong> &ndash; List of all the Current Involvements for this
                Academic Session. Pick the Academic Session in the drop down menu to view
                Involvements from other times of year.
              </li>
              <li>
                <strong>Events</strong> &ndash; Displays a table of upcoming events on campus. You
                can search for specific events by name, location, or time. You can also filter just
                for events offering CL&amp;W credit.
              </li>
              <li>
                <strong>Search Bar</strong> &ndash; You can search for students, faculty, and Gordon
                staff. (Just search by first or last name, don't include titles like Dr.)
              </li>
              <li>
                <strong>My Profile</strong> &ndash; This page is accessible from the profile image
                on the top right (on Desktop), or in the Navigation Drawer to the left (on Mobile).
                Here you can view your personal information (such as your Student ID, and any
                Involvements you have been a part of) and access your co-curricular transcript. You
                can toggle what information is made visible to other students, as well as update or
                hide your profile photo (click on your photo for photo options). Anything with a
                lock is permanently private and can only be seen by you. There is also an option to
                link your personal social media accounts, that will be visible to other users.
              </li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    USER LEVELS
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                <strong>Subscriber</strong> &ndash; Subscriber mode, can follow the Involvement and
                receive Group email. Does not appear on Co-Curricular Transcript view.
              </li>
              <li>
                <strong>Member</strong> &ndash; Members appear on the roster and can see other
                Members and Subscribers (Guests). Members receive Group Emails and have their role
                recorded in Memberships on the Co-Curricular Transcript, with a Title, if added.
              </li>
              <li>
                <strong>Leader</strong> &ndash; Leaders appear on the roster with Title, with all
                the same privileges and Members. Leadership appears on Co-Curricular Transcript view
                and Official Co-Curricular Transcript, with Title.
              </li>
              <li>
                <strong>Advisor</strong> &ndash; Faculty or Staff Advisor have the same privileges
                as Leaders. It is recommended to give an Advisor a Title for the Roster.
              </li>
              <li>
                <strong>Admin</strong> &ndash; can manage all Subscribers, Members and Leaders in
                the Involvement. They can also manage join requests, Send Group Email, and Edit the
                Involvement Information (photo, web link, Description). Admin privileges can be
                granted to Members of any type.
              </li>
              <li>
                <strong>Super-Admin</strong> &ndash; Administrative role for program and department
                staff responsible for multiple Involvements. Super-Admins have admin privileges for
                all Involvements, regardless if they have been added as members.
              </li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    MANAGEMENT/EDITING FUNCTIONS
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                <strong>Group Email</strong> &ndash; Leaders/Advisors can email the full roster of
                Members, plus any Subscribers to your Communications feed. Allows direct connection
                emails.
              </li>
              <li>
                <strong>Subscriber</strong> &ndash; Subscribes to the Email Feed from your Leader or
                Advisor &ldquo;Email Group&rdquo; function. Subscribers cannot see Members on the
                Roster, but can see Involvement Information.
              </li>
              <li>
                <strong>Managing Requests</strong> &ndash; To receive a Subscriber or Membership
                request, go to the home page, or open the Involvement you Lead/Advise. New requests
                appear at the top of the roster. To modify a request to a different user level, use
                the dropdown menu (Advisor, Leader, Member, Subscriber) to assign a different level.
                Add an appropriate Title for Leaders and Advisors. You can add a Title to other
                users, too.
              </li>
              <li>
                <strong>Title/Comment</strong> &ndash; Short but descriptive job or role title that
                will appear on the Roster and the Co-Curricular Transcript. Helps manage roles in
                large rosters. Recommended for Leader and Advisors, can be used for anyone. These
                are public and appear as a detail for the Official Co-Curricular Transcript!
              </li>
              <li>
                <strong>Web link</strong> &ndash; Link to an Involvement&apos;s web page for more
                information.
              </li>
              <li>
                <strong>Description</strong> &ndash; Recommended 1-2 sentence Involvement
                description, and place for updating Meeting Times and Locations for Involvement
                Seekers, Subscribers and Members.
              </li>
              <li>
                <strong>Image</strong> &ndash; 72DPI, no larger than 320x320 pixels and 100KB or
                less. Recommend a square image for clearest quality. Default image will fill where
                there is no Image loaded.
              </li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    TROUBLESHOOTING/ISSUES
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                <a
                  href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug"
                  style={{ color: gordonColors.primary.cyan }}
                >
                  Contact CTS
                </a>
                &nbsp;for issues using the portal on your device, or for login issues, or any
                peculiar behaviors.
              </li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    PLATFORMS
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                Tested successfully on Windows (Firefox, Chrome), Mac (Safari, Firefox, Chrome), and
                on Android and iPhone default browsers. Currently not working on Edge or Internet
                Explorer.
              </li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    FAQ
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body1" gutterBottom component="ul">
              <br />
              <li>
                <strong>Do I have to rejoin an Involvement each semester?</strong> Yes. This allows
                each student to control their inclusion in Involvements for their Co-Curricular
                Transcript. Student Leaders and Advisors can ADD members and guests, too, and some
                may do this to help maintain their team roster.
              </li>
              <li>
                <strong>
                  What&apos;s the difference between subscribing to, and joining an Involvement?{' '}
                </strong>
                Subscribing to an Involvement allows you to receive emails from the Involvement, but
                not to view other members of the Involvement. Joining a Involvement means you're a
                member of the Involvement, and can view other members in the Involvement, in
                addition to getting emails.
              </li>
              <li>
                <strong>What if I leave an Involvement?</strong> Subscribership and Membership are
                fluid during an academic session, and are confirmed at the conclusion of a session.
                You can come and go over the semester, and your Membership will move to your
                official Co-Curricular Transcript only at the end of the semester.
              </li>
              <li>
                <strong>What if I am in an Involvement I don&apos;t want to be part of? </strong>
                No problem. Contact the Involvement leaders or advisor.
              </li>
              <li>
                <strong>
                  I&apos;m an alumna or alumnus. Why do I not see the join button anymore?{' '}
                </strong>
                Sorry, but alumni cannot join new Involvements. You could still subscribe to
                Involvements to receive emails!
              </li>
            </Typography>
            <Typography variant="subheading" gutterBottom>
              <br /> Found a bug?
              <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
                <Button style={{ color: gordonColors.primary.cyan }}>Report to CTS</Button>
              </a>
            </Typography>
          </Grid>
        </Grid>
      </section>
    );
  }
}
