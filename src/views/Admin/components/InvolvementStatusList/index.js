import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import session from '../../../../services/session';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import activity from '../../../../services/activity';
import Button from '@material-ui/core/Button';

export default class InvolvementStatusList extends Component {
  constructor(props) {
    super(props);

    this.state = { currentSession: '' };
  }

  async componentWillMount() {
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
                  to={`/activity/${this.state.currentSession}/${this.props.Activity.ActivityCode}`}
                >
                  <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Link
                  to={`/activity/${this.state.currentSession}/${this.props.Activity.ActivityCode}`}
                >
                  <Typography>
                    <b>{Activity.ActivityDescription}</b>
                  </Typography>
                </Link>
              </Grid>
              {/* <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => activity.closeActivity(Activity.ActivityCode, '201809')}
                size="small"
                >
                Close
                </Button>
              </Grid>      */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
