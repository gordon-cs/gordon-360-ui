import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { gordonColors } from '../../theme';
import Version from '../../services/version';
import './changelog.css';

export default class Changelog extends Component {
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
              What's New
            </Typography>
            <hr style={style} />
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    Summer 2019
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body2" gutterBottom component="ul">
              <br />
              <li>Links Page</li>
              <li>Victory Promise</li>
              <li>Public schedule</li>
              <li>Mobile web app</li>
              <li>ID uploader</li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    Academic Year 18/19
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body2" gutterBottom component="ul">
              <br />
              <li>Bug Fixes, Performance Improvements</li>
            </Typography>
            <br />
            <Grid item>
              <Card>
                <div style={headerStyle}>
                  <Typography variant="body2" style={headerStyle}>
                    Summer 2018
                  </Typography>
                </div>
              </Card>
            </Grid>
            <Typography variant="body2" gutterBottom component="ul">
              <br />
              <li>Redesigned UI</li>
              <li>Advanced People Search</li>
              <li>Feedback Page</li>
            </Typography>
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
