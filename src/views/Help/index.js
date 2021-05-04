import React, { Component } from 'react';
import { gordonColors } from 'theme';
import './help.css';

import { Typography, Grid, Button, Card, CardHeader, CardContent } from '@material-ui/core';

export default class Help extends Component {
  render() {
    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} lg={8}>
            <Card className="help">
              <CardHeader
                className="help-title"
                title="Gordon 360 Help"
                titleTypographyProps={{ variant: 'h4' }}
              />
              <CardContent>
                <Card>
                  <CardHeader
                    className="help-header"
                    title={`LOGIN INSTRUCTIONS`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>Please use your 'firstname.lastname' username or your Gordon email address</li>
                      <li>Use your current Gordon College account password here as well.</li>
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`SITE NAVIGATION`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>
                        <strong>Home</strong> &ndash; Contains a chart displaying the number of days left in
                        the current semester, alongside the number of Christian Life &amp; Worship Credits
                        you have earned this semester. This chart can be clicked to view the CL&amp;W events
                        you have attended. You can also view your pending requests to join Involvements, as
                        well as requests to join your club, if you are a leader.
                      </li>
                      <li>
                        <strong>Involvements</strong> &ndash; Is a list of all the Current Involvements for this
                        Academic Session. Pick the Academic Session in the drop down menu to view
                        Involvements from other times of year.
                      </li>
                      <li>
                        <strong>Events</strong> &ndash; Displays a table of upcoming events on campus. You
                        can search for specific events by name, location, or time. You can also filter by
                        event type including those the offer CL&amp;W credit.
                      </li>
                      <li>
                        <strong>People</strong> &ndash; Allows searching the campus community with more
                        in-depth filters than the normal search bar. You can filter students, staff, and
                        faculty by name or hall and by academic, home, and office info.
                      </li>
                      <li>
                        <strong>Search Bar</strong> &ndash; Allows basic searching for Gordon students,
                        faculty, and staff by name. (Just search by first or last name, don't include
                        titles like Dr.)
                      </li>
                      <li>
                        <strong>My Profile</strong> &ndash; Shows your personal information (such as your Student ID, and any
                        Involvements you have been a part of) and your co-curricular transcript. This page is accessible from the profile image
                        on the top right (on Desktop), or in the Navigation Drawer to the left (on Mobile). You
                        can toggle what information is made visible to other students, as well as update or
                        hide your profile photo (click on your photo for photo options). Anything with a
                        lock is permanently private to only be seen by you. There is also an option to
                        link your personal social media accounts which will be visible to other users.
                      </li>
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`INVOLVEMENT USER LEVELS`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>
                        <strong>Subscriber</strong> &ndash; Subscribers will receive Group emails. The
                        Involvement will not appear on their Co-Curricular Transcript.
                      </li>
                      <li>
                        <strong>Member</strong> &ndash; Members appear on the roster and can see other
                        Members and Subscribers (Guests). Members receive group emails and have their role
                        recorded in Memberships on the Co-Curricular Transcript, with a position title, if added.
                      </li>
                      <li>
                        <strong>Leader</strong> &ndash; Leaders appear on the roster with a title and with all
                        the same privileges and Members. Leadership appears on Co-Curricular Transcript view
                        and Official Co-Curricular Transcript, with their position title.
                      </li>
                      <li>
                        <strong>Advisor</strong> &ndash; Faculty or Staff Advisor have the same privileges
                        as Leaders. It is recommended to give an Advisor a position title for the Roster.
                      </li>
                      <li>
                        <strong>Admin</strong> &ndash; Admins can manage all Subscribers, Members and Leaders in
                        the Involvement. They can also manage join requests, Send Group Email, and Edit the
                        Involvement Information (photo, web link, description, etc.). Admin privileges can be
                        granted to Members of any type.
                      </li>
                      <li>
                        <strong>Super-Admin</strong> &ndash; Super-Admins have admin privileges for
                        all Involvements, regardless if they have been added as Members. This is an
                        administrative role for program and department staff, responsible for multiple
                        Involvements. 
                      </li>
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`MANAGEMENT & EDITING INVOLVEMENTS`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>
                        <strong>Group Email</strong> &ndash; Leaders/Advisors can email the full roster of
                        Members, plus any Subscribers to their Communications feed. Allows direct connection
                        emails.
                      </li>
                      <li>
                        <strong>Subscriber</strong> &ndash; Subscribers receive the email feed from their Leader or
                        Advisor &ldquo;Email Group&rdquo; function. Subscribers cannot see Members on the
                        Roster, but can see Involvement Information.
                      </li>
                      <li>
                        <strong>Managing Requests</strong> &ndash; To manager a Subscriber or Membership
                        request, go to the home page, or open the Involvement you Lead/Advise. New requests
                        appear at the top of the roster. To modify a request to a different user level, use
                        the dropdown menu (Advisor, Leader, Member, Subscriber) to assign a different level.
                        Add an appropriate position title for Leaders and Advisors. You can add a title to other
                        users as well.
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
                        description, and place for updating meeting times and locations for Involvement
                        seekers, Subscribers, and Members.
                      </li>
                      <li>
                        <strong>Involvement Image</strong> &ndash; 72DPI, no larger than 320x320 pixels and 100KB or
                        less. Recommend a square image for clearest quality. Default image will fill where
                        there is no Image loaded.
                      </li>
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`ISSUES & TROUBLESHOOTING`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`SUPPORTED PLATFORMS`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>
                        360 has been successfully tested on Windows (Firefox, Chrome), Mac (Safari,
                        Firefox, Chrome), and on Android and iPhone default browsers.
                      </li>
                      <li>
                        Currently, Gordon 360 is not supported on Microsoft Edge or Internet Explorer.
                      </li>
                    </Typography>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    className="help-header"
                    title={`FAQ`}
                    titleTypographyProps={{ variant: 'body1' }}
                  />
                  <CardContent>
                    <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                      <li>
                        <strong>Do I have to rejoin an Involvement each semester?</strong> Yes. This allows
                        each student to control their participation in Involvements for their Co-Curricular
                        Transcript. Student Leaders and Advisors can ADD members and guests too! Some
                        may do this to help maintain their team roster.
                      </li>
                      <li>
                        <strong>
                          What&apos;s the difference between subscribing to, and joining an Involvement?{' '}
                        </strong>
                        Subscribing to an Involvement allows you to receive emails from the Involvement, but
                        not to view other members of the Involvement. Joining a Involvement means you're an
                        active member of the Involvement. You can view other members in the Involvement in
                        addition to getting group emails.
                      </li>
                      <li>
                        <strong>What if I leave an Involvement?</strong> Subscribership and Membership are
                        fluid during an academic session, and are confirmed at the conclusion of a session.
                        You can come and go over the semester, and your Membership will move to your
                        official Co-Curricular Transcript only at the end of the semester.
                      </li>
                      <li>
                        <strong>What if I am in an Involvement I don&apos;t want to be part of? </strong>
                        No problem. Contact the Involvement leaders or advisor and they will be able to
                        remove you from the list.
                      </li>
                      <li>
                        <strong>
                          I&apos;m an alumna or alumnus. Why do I not see the join button anymore?{' '}
                        </strong>
                        We apologize, but alumni cannot join new Involvements. You could still subscribe to
                        Involvements to receive emails!
                      </li>
                    </Typography>
                  </CardContent>
                </Card>

              </CardContent>
            </Card>
            <Typography variant="subtitle1" gutterBottom>
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
