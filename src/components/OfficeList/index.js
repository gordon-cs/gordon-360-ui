import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';

export default class Office extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFac: Boolean,
      profile: {},
    };
  }

  componentWillMount() {
    this.setState({ isFac: String(this.props.profile.PersonType).includes('fac') });
    this.setState({ profile: this.props.profile });
  }
  render() {
    let OfficeHours, OfficePhone, Room, Office;
    console.log(this.state.profile);
    if (this.state.isFac) {
      if (this.state.profile.OnCampusPhone !== '') {
        OfficePhone = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Office Phone:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <a href={'tel:978927' + this.state.profile.OnCampusPhone}>
                    {' '}
                    <Typography className="linkColor">
                      {' '}
                      {'(978) 927-' + this.state.profile.OnCampusPhone}
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.state.profile.office_hours !== '') {
        OfficeHours = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Office Hours:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <Typography> {this.state.profile.office_hours}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.state.profile.BuildingDescription !== '' && this.state.profile.OnCampusRoom !== '') {
        Room = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Room:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <Typography>
                    {' '}
                    {this.state.profile.BuildingDescription}, {this.state.profile.OnCampusRoom}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      Office = (
        <Card>
          <CardContent>
            <CardHeader title="Office Information" />
            <List>
              {Room}
              {OfficePhone}
              {OfficeHours}
            </List>
          </CardContent>
        </Card>
      );
    }
    return (
      <Grid item xs={12}>
        {Office}
      </Grid>
    );
  }
}
