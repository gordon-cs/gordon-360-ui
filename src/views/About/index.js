import React, { useState, useEffect } from 'react';
import { gordonColors } from 'theme';
import versionService from 'services/version';
import { projectName } from 'project-name';
import contributors from './contributors.json';
import origins from './origins.json';
import './about.css';

import { Typography, Grid, Button, Card, CardHeader, CardContent } from '@material-ui/core';

const About = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    versionService.getVersion().then(setVersion);
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card className="about">
          <CardHeader
            className="about-title"
            title="Conceived and Built at Gordon College"
            subheader="By Students for Students"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Card>
              <CardHeader
                className="about-header"
                title={`${projectName}: The Scottie Faire In Your Hand`}
              />
              <CardContent>
                <Typography variant="body1" component="ul" style={{ textAlign: 'start' }}>
                  <li>Mobile-friendly, responsive web portal</li>
                  <li>Promotional access to student Involvement and leadership</li>
                  <li>Academic session-based Campus Involvements and Leadership Experiences</li>
                  <li>Subscriber email feeds</li>
                  <li>Membership affinity connections</li>
                  <li>Student leader and Advisor Activity self-management</li>
                  <li>Rosters and administrative records</li>
                  <li>Student Membership and Leadership Co-Curricular Transcript</li>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="about-header" title="Institutional Benefits" />
              <CardContent>
                <Typography variant="body1" component="ul">
                  <li>In-house Student Record relationship</li>
                  <li>
                    Official &ldquo;Gordon Co-Curricular Transcript&rdquo; with unofficial portal
                    view
                  </li>
                  <li>Academic Advising resource</li>
                  <li>Leadership and Involvement advising resource</li>
                  <li>Institutional reporting</li>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="about-header" title="Origins" />
              <CardContent>
                {origins.map((section) => {
                  return (
                    <React.Fragment key={section.title}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{section.title}</strong>
                      </Typography>
                      <Typography variant="body2" paragraph className="about-Origins">
                        {section.body}
                      </Typography>
                    </React.Fragment>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="about-header" title="GoCo Tech Lab Developers" />
              <CardContent>
                {contributors.map((section) => {
                  return (
                    <React.Fragment key={section.title}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{section.title}</strong>
                      </Typography>
                      <Typography variant="body2" paragraph className="about-contributors">
                        {section.body}
                      </Typography>
                    </React.Fragment>
                  );
                })}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Typography variant="subtitle1">
          Found a bug?
          <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
            <Button style={{ color: gordonColors.primary.cyan }}>Report to CTS</Button>
          </a>
        </Typography>
        <hr />
        <Typography variant="body2" paragraph>
          Api Version - {version} UTC
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
