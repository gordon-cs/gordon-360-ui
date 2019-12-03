import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';
import List from '@material-ui/core/List';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.state = { open: false };
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    const header = (
      <div style={headerStyle}>
        <Grid container direction="row">
          <Grid item xs={4}>
            <Typography variant="body2" style={headerStyle}>
              EVENT
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" style={headerStyle}>
              DATE
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" style={headerStyle}>
              NAME
            </Typography>
          </Grid>
        </Grid>
      </div>
    );

    const content = (
      <section>
      <Card onClick={this.handleExpandClick}>
        <CardContent>
          <Typography>Christmas Gala Ticket For Sale</Typography>
          <Typography type="caption">SeHee Hyung</Typography>
        </CardContent>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Description</Typography>
            <Typography type="caption">Hi All, I'm selling a Christmas Gala Ticket.</Typography>
            {/* {content} */}
          </CardContent>
        </Collapse>
      </Card>
    </section>
    );

    return (
      <section>
        <Card>
          {header}
          <Grid>
            <List className="event-list">{content}</List>
          </Grid>
        </Card>
      </section>
    );
  }
}
