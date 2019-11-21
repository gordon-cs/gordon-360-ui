import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { gordonColors } from '../../theme';
import Version from '../../services/version';
import { projectName } from '../../project-name';
import './about.css';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      version: null,
    };
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const versionPromise = Version.getVersion();
    const version = await versionPromise;

    this.setState({ loading: false, version });
  }

  render() {
    const style = {
      color: gordonColors.primary.blue,
    };
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <br />
            <hr style={style} />
            <Typography variant="h5" gutterBottom align="center">
              Conceived and Built at Gordon College - By Students for Students
            </Typography>
            <hr style={style} />
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    {projectName}: THE SCOTTIE FAIRE IN YOUR HAND
                    {/*GORDON&apos;S 360 MOBILE INVOLVEMENTS PLATFORM: THE SCOTTIE FAIRE IN YOUR HAND*/}
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body2" gutterBottom component="ul">
              <br />
              <li>Mobile-friendly, responsive web portal</li>
              <li>Promotional access to student Involvement and leadership</li>
              <li>Academic session-based Campus Involvements and Leadership Experiences</li>
              <li>Subscriber email feeds</li>
              <li>Membership affinity connections</li>
              <li>Student leader and Advisor Activity self-management</li>
              <li>Rosters and administrative records</li>
              <li>Student Membership and Leadership Co-Curricular Transcript</li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    INSTITUTIONAL BENEFITS
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body2" gutterBottom component="ul">
              <br />
              <li>In-house Student Record relationship</li>
              <li>
                Official &ldquo;Gordon Co-Curricular Transcript&rdquo; with unofficial portal view
              </li>
              <li>Academic Advising resource</li>
              <li>Leadership and Involvement advising resource</li>
              <li>Institutional reporting</li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    ORIGINS
                  </Typography>
                </div>
              </Card>
            </Grid>
            <div class="indent">
              <br />
              <Typography variant="subtitle1" gutterBottom>
                <strong>Concept and Imagineering</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Carissa Church&nbsp;&apos;18 and Grace Crook&nbsp;&apos;18
                <br />
                Chris Carlson&nbsp;&apos;87, Student Life
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Incubation Team</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Ezeanyinabia &lsquo;Eze&rsquo; Anyanwu&nbsp;&apos;17, Adam
                Bartholomew&nbsp;&apos;17, and James Kempf&nbsp;&apos;17
                <br /> Dr.&nbsp;Russ Tuck, Summer Practicum in Computer Science (2016)
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Product Deployment and Support</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Emmanuel Roussel&nbsp;&apos;17 and Stephanie Powers&nbsp;&apos;17
                <br /> Chris Hansen, Jason Whitehouse&nbsp;&apos;99, Information Systems Group
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Software Development Team, Summer 2017</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Bradley Boutcher&nbsp;&apos;18, Matthew Felgate&nbsp;&apos;18, Jenny
                Kim&nbsp;&apos;19, Sam Nguyen&nbsp;&apos;19, Chris Qiao&nbsp;&apos;17, and Joseph
                Ross
                <br />
                Dr.&nbsp;Russ Tuck, Dr.&nbsp;Jonathan Senning&nbsp;&apos;85, Summer Practicum in
                Computer Science (2017)
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Software Development Team, 2017/2018</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Addison Abbot&nbsp;&apos;20, Matt Felgate&nbsp;&apos;18, and Rebekah
                Stauffer&nbsp;&apos;19
                <br /> Chris Hansen, Jason Whitehouse&nbsp;&apos;99, Information Systems Group
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Software Development Team, Summer 2018</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Addison Abbot&nbsp;&apos;20, Nikki Adevai&nbsp;&apos;19, Emily Bishop&nbsp;&apos;20,
                Stephen Macomber&nbsp;&apos;19, Max Moniz&nbsp;&apos;19, and Nathaniel
                Rudenberg&nbsp;&apos;20
                <br />
                Dr.&nbsp;Russ Tuck, Dr.&nbsp;Jonathan Senning&nbsp;&apos;85, Summer Practicum in
                Computer Science (2018)
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Software Development Team, 2018/2019</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Addison Abbot&nbsp;&apos;20, Nikki Adevai&nbsp;&apos;19, Emily Bishop&nbsp;&apos;20,
                Nathaniel Rudenberg&nbsp;&apos;20, and Sam Nguyen&nbsp;&apos;19,
                <br /> Chris Hansen, Jason Whitehouse&nbsp;&apos;99, Information Systems Group
              </Typography>
              <Typography variant="subheading" gutterBottom>
                <strong>Software Development Team, Summer 2019</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Isaac Bleecker&nbsp;&apos;21, Jahnuel Dorelus&nbsp;&apos;21, SeHee
                Hyung&nbsp;&apos;22, Phil Lee, Yerang Lim&nbsp;&apos;21, Hyeok Chin (Jake)
                Moon&nbsp;&apos;19, Evan Platzer&nbsp;&apos;20, Joshua Rogers&nbsp;&apos;21, and Yi
                (Edward) Zhou&nbsp;&apos;20
                <br />
                Dr.&nbsp;Russ Tuck, Dr.&nbsp;Jonathan Senning&nbsp;&apos;85, Summer Practicum in
                Computer Science (2019)
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Software Development Team, 2019/2020</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Ben Abbett&nbsp;&apos;21 Addison Abbot&nbsp;&apos;20, Nathaniel
                Rudenberg&nbsp;&apos;20, Jessica Guan&nbsp;&apos;21 and Joshua Rogers&nbsp;&apos;21
                <br /> Chris Hansen, Jason Whitehouse&nbsp;&apos;99, Information Systems Group
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Beneficent Philanthropes</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                To the visionary benefactors who support the Summer Practicum in Computer Science
                program at Gordon College, thank you!
                <br />
                <br />
                And to Dr.&nbsp;D.&nbsp;Michael Lindsay, President, and Jennifer
                Jukanovich&nbsp;&apos;94, Vice President for Student Life, thank you for the
                opportunity to apply our learning in a creative, practical way!
                <br />
                <br />
                And to our mentors and coaches in development and deployment, thank you for your
                guidance and encouragement to try new things.
              </Typography>
            </div>
            <Typography variant="subtitle1" gutterBottom>
              <br /> Found a bug?
              <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
                <Button style={{ color: gordonColors.primary.cyan }}>Report to CTS</Button>
              </a>
            </Typography>
            <hr style={style} />
            <Typography variant="body2" paragraph>
              Api Version - {this.state.version}
            </Typography>
          </Grid>
        </Grid>
      </section>
    );
  }
}
