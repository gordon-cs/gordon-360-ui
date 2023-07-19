import { Fragment, useState, useEffect } from 'react';
import versionService from 'services/version';
import contributors from './contributors.json';
import supporters from './supporters.json';
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
            titleTypographyProps={{ variant: 'h4' }}
          />
          <Typography className={styles.about_subheader}>By Students for Students</Typography>
          <CardContent>
            <Card>
              <CardHeader className={styles.about_header} title="History" />
              <CardContent>
                <Typography variant="body1">
                  Gordon 360 was created by students in the
                  2016 Summer Practicum in Computer Science.
                  It started with two main goals: capture co-curricular
                  involvements for an experience transcript,
                  and make basic info like meal credits and chapel attendance
                  easily available.
                </Typography>
                <br />
                <Typography variant="body1">
                  Since then, students have worked on 360 in subsequent Summer
                  Practicums, for GoCo labs during the school year, and as
                  senior projects.  Major additions include:
                  <ul>
                  <li>Events search on the master
                    calendar (integrating with 25Live),</li>
                  <li>People search, which is now the sole campus
                    directory,</li>
                  <li>individual profiles to allow people to update their
                    data and control its visiblity to the campus community,</li>
                  <li>Timesheets for student jobs on campus,</li>
                  <li>dark mode,</li>
                  <li>(coming soon) RecIM to manage fun and competitive
                    recreational activities,</li>
                  <li>and more.</li>
                  </ul>
                  They also maintained the code, revising and sometimes
                  rewriting it to use new tools and adapt to changes
                  in existing tools.
                </Typography>
                <br />
                <Typography variant="body1">
                  Faculty and CTS staff have helped with
                  coaching and code reviews, and sometimes with actual coding.
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
                  <li>Reduced reliance on old and outside websites</li>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className={styles.about_header} title="Supporters" />
              <CardContent>
                {supporters.map((section) => {
                  return (
                    <Fragment key={section.title}>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>{section.title}</strong>
                      </Typography>
                      <Typography variant="body2" paragraph
                                  className={styles.about_contributors}>
                        {section.body}
                      </Typography>
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className={styles.about_header} title="Developers" />
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
        <Typography variant="subtitle1" className={styles.about_text}>
          Found a bug?
          <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
            <Button variant="text" className="gc360_text_link">
              Report to CTS
            </Button>
          </a>
        </Typography>
        <hr />
        <Grid container xs={12}>
          <Grid item xs={1}>
            <Typography variant="body2" className={styles.about_text}>
              UI
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" className={styles.about_text}>
              {versionUI.date} (Git SHA: {versionUI.commit})
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" className={styles.about_text}>API</Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" className={styles.about_text}>
              {versionAPI?.BuildTime} (Git SHA: {versionAPI?.GitHash})
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
