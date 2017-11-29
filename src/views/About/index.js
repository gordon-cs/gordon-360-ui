import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

import './about.css';

export default class About extends Component {
  render() {
    return (
      <section>
        <Typography type="Headline" gutterBottom>
          Conceived and built at Gordon College, by students for students.
          Everyone should be involved in something at College. It’s
          what makes College your own Experience.
        </Typography>
        <Typography type="title" gutterBottom>
          Gordon’s 360 Mobile Activities Platform: The Scottie Faire in your hand
        </Typography>
        <Typography type="body1" paragraph>
          <ul>
            <li>Mobile-friendly, responsive web portal</li>
            <li>Promotional access to student Involvement and leadership</li>
            <li>Academic session-based Campus Activities and Leadership Experiences</li>
            <li>Subscriber email feeds</li>
            <li>Membership affinity connections</li>
            <li>Student leader and Advisor Activity self-management</li>
            <li>Rosters and administrative records</li>
            <li>Student Membership and Leadership Experience Transcript</li>
          </ul>
        </Typography>
        <Typography type="title" gutterBottom>
          Institutional Benefits
        </Typography>
        <Typography type="body1" paragraph>
          <ul>
            <li>In-house Student Record relationship</li>
            <li>Official “Gordon Experience Transcript” with unofficial portal view</li>
            <li>Academic Advising resource</li>
            <li>Leadership and Involvement advising resource</li>
            <li>Institutional reporting</li>
          </ul>
        </Typography>
        <Typography type="title" gutterBottom>
          Origins
        </Typography>
        <Typography type="subheading" gutterBottom>
          Concept and Imagineering
        </Typography>
        <Typography type="body1" paragraph>
            Carissa Church ’18 and Grace Crook ‘18
          <br />Chris Carlson ’87, Student Life
        </Typography>
        <Typography type="subheading" gutterBottom>
          Incubation Team
        </Typography>
        <Typography type="body1" paragraph>
            Ezeanyinabia ‘Eze’ Anyanwu ’17, Adam Bartholomew ’17, and James Kempf ‘17
          <br /> Dr. Russ Tuck, Summer Practicum in Computer Science program (2016)
        </Typography>
        <Typography type="subheading" gutterBottom>
              Product Deployment and Support
        </Typography>
        <Typography type="body1" paragraph>
            Emmanuel Roussel ‘17 and Stephanie Powers &apos;17
          <br /> Chris Hansen, Jason Whitehouse ’99, Information Systems Group
        </Typography>
        <Typography type="subheading" gutterBottom>
              Software Development Team, 2016/2017
        </Typography>
        <Typography type="body1" paragraph>
          Bradley Boutcher &apos;18, Matthew Felgate &apos;18, Jenny Kim &apos;19, Sam Nguyen
          &apos;19, Joseph Ross, and Chris Qiao &apos;17
          <br />
          Dr. Russ Tuck, Dr. Jonathan Senning, Summer Practicum in Computer Science program (2017)
        </Typography>
        <Typography type="subheading" gutterBottom>
          Software Development Team, 2017/2018
        </Typography>
        <Typography type="body1" paragraph>
          Addison Abbot &apos;20, Matt Felgate &apos;18, and Rebekah Stauffer &apos;19
        </Typography>
        <Typography type="subheading" gutterBottom>
          Beneficient Philanthropes
        </Typography>
        <Typography type="body1" paragraph>
            To the visionary benefactors who support the Summer Practicum in Computer Science
            program at Gordon College, thank you!
          <br /> And to Dr. D. Michael Lindsay, President, and Jennifer Jukanovich ’94, Vice
            President for Student Life, thank you for
            the opportunity to apply our learning in a creative, practical way!
          <br /> And to our mentors and coaches in development and deployment, thank you for
              your guidance and encouragement to try new things.
        </Typography>
        <Typography type="caption" gutterBottom>
          Found a bug?
          <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug"> Report to CTS</a>
        </Typography>
      </section>
    );
  }
}
