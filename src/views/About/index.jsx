import { Fragment, useState, useEffect } from 'react';
import versionService from 'services/version';
import { projectName } from 'project-name';
import contributors from './contributors.json';
import origins from './origins.json';
import versionUI from './version.json';
import styles from './About.module.css';

import { Typography, Grid, Button, Card, CardHeader, CardContent } from '@mui/material';

const About = () => {
  const [versionAPI, setVersion] = useState(null);

  useEffect(() => {
    versionService.getVersion().then(setVersion);
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card className={styles.about}>
          <CardHeader
            className={styles.about_title}
            title="Conceived and Built at Gordon College"
            subheader="By Students for Students"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Card>
              <CardHeader
                className={styles.about_header}
                title={`${projectName}: For Students by Students`}
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
              <CardHeader className={styles.about_header} title="Institutional Benefits" />
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
              <CardHeader className={styles.about_header} title="Origins" />
              <CardContent>
                {origins.map((section) => {
                  return (
                    <Fragment key={section.title}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{section.title}</strong>
                      </Typography>
                      <Typography variant="body2" paragraph className={styles.about_Origins}>
                        {section.body}
                      </Typography>
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className={styles.about_header} title="GoCo Tech Lab Developers" />
              <CardContent>
                {contributors.map((section) => {
                  return (
                    <Fragment key={section.title}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{section.title}</strong>
                      </Typography>
                      <Typography variant="body2" paragraph className={styles.about_contributors}>
                        {section.body}
                      </Typography>
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Typography variant="subtitle1">
          Found a bug?
          <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
            <Button color="secondary">Report to CTS</Button>
          </a>
        </Typography>
        <hr />
        {versionUI.map((section) => {
          return (
            <Fragment key={section.commit}>
              <Grid container xs={6}>
                <Grid item xs={1}>
                  <Typography variant="body2">UI</Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body2">
                    {section.date} (Git SHA: {section.commit})
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="body2">API</Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body2">
                    {versionAPI?.BuildTime} (Git SHA: {versionAPI?.GitHash})
                  </Typography>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default About;
