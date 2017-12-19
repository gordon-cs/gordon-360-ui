import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

import './help.css';

export default class Help extends Component {
  render() {
    return (
      <section>
        <Typography type="title" gutterBottom>
          Login
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>Firstname.Lastname or Gordon email address</li>
          <li>Normal Gordon password</li>
        </Typography>
        <Typography type="title" gutterBottom>
          Site Navigation
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            <strong>My Activities</strong> – List of Current and Past Leadership or Memberships. If
            blank, go to All Activities to get connected.
          </li>
          <li>
            <strong>All Activities</strong> - List of all Current Activities for this Academic
            Session. Pick the Academic Session in the drop down menu for the Session you want to
            connect your involvement(s). Current Active Session defaults to Current Academic
            Session.
          </li>
          <li>
            <strong>Transcript</strong> – Unofficial Experience Transcript, listing Leadership and
            Membership activity for each Session. Great for building resumés, cover letters, and
            interview conversations. The Official Gordon Experience Transcript is certified by
            request (coming 2017-18!), and will be part of the Gordon College Experience Portfolio
            (coming 2018-19, or sooner!).
          </li>
          <li>
            <strong>Profile</strong> – Managing your profile, and managing any advising or
            leadership functions for assigned groups.
          </li>
          <li>
            <strong>Profile Red Dot</strong> – You have Subscriber or Membership requests for one or
            more of the groups you Lead or Advise! Process these to add new Subscribers, Members,
            and to assign them a membership type and a “Title” if appropriate. Titles will appear on
            the Official Transcript (be clever, but appropriate!).
          </li>
        </Typography>
        <Typography type="title" gutterBottom>
          User Levels
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            <strong>Subscriber</strong> – Guest mode, can follow Activity Group and receive Group
            Email. Does not appear on Transcript view.
          </li>
          <li>
            <strong>Member</strong> – Members appear on the roster and can see other Members and
            Subscribers (Guests). Members receive Group Emails and have their role recorded in
            Memberships on the Experience Transcript, with a Title, if added.
          </li>
          <li>
            <strong>Leader</strong> – Leaders appear on the roster with Title, can manage all
            Subscribers, Members and Leaders in the Group, manage join requests, Send Group Email,
            and Edit the Activity Group Information (photo, web link, Description). Leadership
            appears on Transcript view and Official Transcript, with Title.
          </li>
          <li>
            <strong>Advisor</strong> – Faculty or Staff Advisor have the same privileges as Leaders.
            Recommend giving an Advisor a Title for the Roster.
          </li>
          <li>
            <strong>Super-Advisor</strong> – Administrative role for program and department staff
            responsible for multiple Activities. Same privileges as Leader and Advisor, plus, can
            manage Activities they are not a Leader or Advisor for.
          </li>
        </Typography>
        <Typography type="title" gutterBottom>
          Management/Editing Functions
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            <strong>Group Email</strong> – Leaders/Advisors can email the full roster of Members,
            plus any Subscribers to your Communications feed. Allows direct connection emails.
          </li>
          <li>
            <strong>Subscriber</strong> – Subscribes to the Email Feed from your Leader or Advisor
            “Email Group” function. Subscribers cannot see Members on the Roster, but can see Group
            Information.
          </li>
          <li>
            <strong>Managing Requests</strong> – To receive a Subscriber or Membership request, go
            to your Profile page, or open the Activity you Lead/Advise. New requests appear at the
            bottom of the roster. To modify a request to a different user level, use the dropdown
            menu (Advisor, Guest, Leader, Member) to assign a different level. Add an appropriate
            Title for Leaders and Advisors. You can add a Title to other users, too.
          </li>
          <li>
            <strong>Title/Comment</strong> - Short but descriptive job or role title that will
            appear on the Roster and the Transcript. Helps manage roles in large rosters.
            Recommended for Leader and Advisors, can be used for anyone. These are public and appear
            as a detail for the Official Transcript!
          </li>
          <li>
            <strong>Web link</strong> – Link to an Activity Group’s web page for more information.
          </li>
          <li>
            <strong>Description</strong> – Recommended 1-2 sentence Activity Group description, and
            place for updating Meeting Times and Locations for Activity Seekers, Subscribers and
            Members.
          </li>
          <li>
            <strong>Image</strong> – 72dpi, no larger than 320x320 pixels and 100kb or less.
            Recommend a square image for clearest quality. Default image will fill where there is no
            Image loaded.
          </li>
        </Typography>
        <Typography type="title" gutterBottom>
          Troubleshooting/Issues
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            Contact CTS for issues using the portal on your device, or for login issues, or any
            peculiar behaviors.
          </li>
        </Typography>
        <Typography type="title" gutterBottom>
          Platforms
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            Tested successfully on Windows (IE, Firefox, Chrome), Mac (Safari, Firefox, Chrome), and
            on Android and iPhone default browsers.
          </li>
        </Typography>
        <Typography type="title" gutterBottom>
          FAQ
        </Typography>
        <Typography type="body1" gutterBottom component="ul">
          <li>
            <strong>Do I have to join a group each semester?</strong> Yes. This allows each student
            to control their inclusion in groups or activities for their Transcript. Student Leaders
            and Advisors can ADD members and guests, too, and some may do this to help maintain
            their team roster.
          </li>
          <li>
            <strong>What’s the advantage to Subscribing to a group? </strong>
            Some groups may have their own social network presence, but since the 360.gordon.edu
            platform creates group rosters of members and guests, Leader can use the tool to
            communicate directly with Guests and Members only.
          </li>
          <li>
            <strong>What’s the advantage to Membership in a group? </strong>
            Membership allows you to see other members in the group, and Membership for that
            academic session is automatically added to the “Memberships” section of your Experience
            Transcript.
          </li>
          <li>
            <strong>What if I leave a group?</strong> Subscribership and Membership are fluid during
            an academic session, and are confirmed at the conclusion of a session. You can come and
            go over the semester, and your Membership will move to your official Transcript only at
            the end of the semester.
          </li>
          <li>
            <strong>What if I am in a group I don’t want to be part of? </strong>
            No problem. Contact the group leaders or advisor.
          </li>
          <li>
            <strong>I’m an alumnum. Why do I not see the join button anymore? </strong>
            Sorry, but alumni cannot join new groups. You could still subscribe to groups to receive
            emails!
          </li>
        </Typography>
      </section>
    );
  }
}
