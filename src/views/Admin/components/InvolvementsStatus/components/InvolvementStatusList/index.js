import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import session from 'services/session';

import { Typography, Grid } from '@material-ui/core';

export default class InvolvementStatusList extends Component {
  constructor(props) {
    super(props);

    this.state = { currentSession: '' };
  }

  async componentDidMount() {
    const { SessionCode: sessionCode } = await session.getCurrent();
    this.setState({ currentSession: sessionCode });
  }

  render() {
    const { Activity } = this.props;
    const imgStyle = {
      width: '20%',
    };

    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={10} lg={12}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Link
                  className="gc360-link"
                  to={`/activity/${this.state.currentSession}/${this.props.Activity.ActivityCode}`}
                >
                  <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Link
                  className="gc360-link"
                  to={`/activity/${this.state.currentSession}/${this.props.Activity.ActivityCode}`}
                >
                  <Typography>
                    <b>{Activity.ActivityDescription}</b>
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
