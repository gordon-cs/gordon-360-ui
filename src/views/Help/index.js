import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { gordonColors } from '../../theme';
import './help.css';

export default class Help extends Component {
  render() {
    const style = {
      color: gordonColors.primary.blue,
    };

    return (
      <section>
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} md={12} lg={8}>
            <Typography variant="display1" gutterBottom style={style}>
              Login
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>Firstname.Lastname or Gordon email address</li>
              <li>Normal Gordon password</li>
            </Typography>
            <br />
            <Typography variant="display1" gutterBottom style={style}>
              Site Navigation
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>
                <strong>Home</strong> &ndash; Contains a chart displaying the number of days left in
                the current semester, alongside the number of Christian Life &amp; Worship Credits
                you have earned this semester. This chart can be clicked to view the CL&amp; events
                you have attended. Your pending requests to join Involvements, as well as requests
                to join you club, if you are a leader.
              </li>
              <li>
                <strong>Involvements</strong> &ndash; List of all Current Involvements for this
                Academic Session. Pick the Academic Session in the drop down menu for the Session
                you want to connect your involvement(s).
              </li>
              <li>
                <strong>Events</strong> &ndash; Displays a table of upcoming events on campus. You
                can search for specific events by name, location, or time. You can also filter just
                for events offering CL&amp;w credit.
              </li>
              <li>
                <strong>Search Bar</strong> &ndash; You can search for students, faculty, and Gordon
                staff. (Just search by first or last name, don't include titles like Dr).
              </li>
              <li>
                <strong>My Profile</strong> &ndash; This page is accessible from the profile image
                on the top right (on Desktop), or in the Navigation Drawer to the left (on Mobile).
                Here you can view your personal information (such as your Student ID, and any
                Involvements you have been a part of) and access your co-curricular transcript. You
                can toggle what information is made visible to other students, as well as update or
                hide your profile photo (click on your photo for photo options). There is also an
                option to link your personal social media accounts, that will be visible to other
                users.
              </li>
            </Typography>
            <br />
            <Typography variant="display1" gutterBottom style={style}>
              User Levels
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>
                <strong>Subscriber</strong> &ndash; Guest mode, can follow Activity Group and
                receive Group Email. Does not appear on Co-Curricular Transcript view.
              </li>
              <li>
                <strong>Member</strong> &ndash; Members appear on the roster and can see other
                Members and Subscribers (Guests). Members receive Group Emails and have their role
                recorded in Memberships on the Co-Curricular Transcript, with a Title, if added.
              </li>
              <li>
                <strong>Leader</strong> &ndash; Leaders appear on the roster with Title, can manage
                all Subscribers, Members and Leaders in the Group, manage join requests, Send Group
                Email, and Edit the Activity Group Information (photo, web link, Description).
                Leadership appears on Co-Curricular Transcript view and Official Co-Curricular
                Transcript, with Title.
              </li>
              <li>
                <strong>Advisor</strong> &ndash; Faculty or Staff Advisor have the same privileges
                as Leaders. Recommend giving an Advisor a Title for the Roster.
              </li>
              <li>
                <strong>Super-Advisor</strong> &ndash; Administrative role for program and
                department staff responsible for multiple Involvements. Same privileges as Leader
                and Advisor, plus, can manage Involvements they are not a Leader or Advisor for.
              </li>
            </Typography>
            <br />
            <Typography variant="display1" gutterBottom style={style}>
              Management/Editing Functions
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>
                <strong>Group Email</strong> &ndash; Leaders/Advisors can email the full roster of
                Members, plus any Subscribers to your Communications feed. Allows direct connection
                emails.
              </li>
              <li>
                <strong>Subscriber</strong> &ndash; Subscribes to the Email Feed from your Leader or
                Advisor &ldquo;Email Group&rdquo; function. Subscribers cannot see Members on the
                Roster, but can see Group Information.
              </li>
              <li>
                <strong>Managing Requests</strong> &ndash; To receive a Subscriber or Membership
                request, go to the home page, or open the Activity you Lead/Advise. New requests
                appear at the bottom of the roster. To modify a request to a different user level,
                use the dropdown menu (Advisor, Guest, Leader, Member) to assign a different level.
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
                <strong>Web link</strong> &ndash; Link to an Activity Group&apos;s web page for more
                information.
              </li>
              <li>
                <strong>Description</strong> &ndash; Recommended 1-2 sentence Activity Group
                description, and place for updating Meeting Times and Locations for Activity
                Seekers, Subscribers and Members.
              </li>
              <li>
                <strong>Image</strong> &ndash; 72DPI, no larger than 320x320 pixels and 100KB or
                less. Recommend a square image for clearest quality. Default image will fill where
                there is no Image loaded.
              </li>
            </Typography>
            <br />
            <Typography variant="display1" gutterBottom style={style}>
              Troubleshooting/Issues
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
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
            <Typography variant="display1" gutterBottom style={style}>
              Platforms
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>
                Tested successfully on Windows (Firefox, Chrome), Mac (Safari, Firefox, Chrome), and
                on Android and iPhone default browsers. Currently not working on Edge or Internet
                Explorer. Or on Windows Phone (lol jk, what's that).
              </li>
            </Typography>
            <br />
            <Typography variant="display1" gutterBottom style={style}>
              FAQ
            </Typography>
            <Typography variant="body1" gutterBottom component="ul">
              <li>
                <strong>Yo wheres the three dot menu at though??</strong> Blame Nikki
              </li>
              <li>
                <strong>Do I have to rejoin a group each semester?</strong> Yes. This allows each
                student to control their inclusion in groups or activities for their Co-Curricular
                Transcript. Student Leaders and Advisors can ADD members and guests, too, and some
                may do this to help maintain their team roster.
              </li>
              <li>
                <strong>
                  What&apos;s the difference between subscribing to, and joining a group?{' '}
                </strong>
                Subscribing to a group allows you to receive emails from the group, but not to view
                other members of the group. Joining a group means you're a member of the group, and
                can view other members in the group, in addition to getting emails.
              </li>
              <li>
                <strong>What if I leave a group?</strong> Subscribership and Membership are fluid
                during an academic session, and are confirmed at the conclusion of a session. You
                can come and go over the semester, and your Membership will move to your official
                Co-Curricular Transcript only at the end of the semester.
              </li>
              <li>
                <strong>What if I am in a group I don&apos;t want to be part of? </strong>
                No problem. Contact the group leaders or advisor.
              </li>
              <li>
                <strong>
                  I&apos;m an alumna or alumnus. Why do I not see the join button anymore?{' '}
                </strong>
                Sorry, but alumni cannot join new groups. You could still subscribe to groups to
                receive emails!
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
