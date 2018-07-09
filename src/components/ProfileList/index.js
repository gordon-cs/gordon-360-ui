import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Majors from './../../components/MajorList';
import Minors from './../../components/MinorList';
import user from './../../services/user';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const PRIVATE_INFO = 'Private as requested.';
// all logic for displaying parts of the Personal Information Card is contained in this file
export default class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProf: false, //if my profile page
    };
  }

  handleChangePrivacy() {
    user.toggleMobilePhonePrivacy();
  }

  formatPhone(phone) {
    let tele = String(phone);
    if (tele.length === 10) {
      return '(' + tele.slice(0, 3) + ') ' + tele.slice(3, 6) + '-' + tele.slice(6);
    }
    if (tele !== 'undefined') {
      return tele;
    }
  }
  componentWillMount() {
    this.setState({ privacy: this.props.profile.IsMobilePhonePrivate });
  }

  render() {
    let address;
    let homephone, mobilephone, Home, street;
    let Department;
    let minors, majors, residence;

    if (this.props.profile.HomeCity === 'Private as requested.') {
      address = 'Private as requested';
    } else if (
      this.props.profile.Country === 'United States Of America' ||
      this.props.profile.Country === ''
    ) {
      address = `${this.props.profile.HomeCity}, ${this.props.profile.HomeState}`;
    } else {
      address = `${this.props.profile.Country}`;
    }

    if (this.props.profile.HomeStreet2 !== '') {
      street = (
        <div>
          <Typography>{this.props.profile.HomeStreet2}</Typography>
        </div>
      );
    }

    if (address !== '') {
      Home = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={6} sm={6} md={3} lg={6}>
                <Typography>Home:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
                {street}
                <Typography>{address} </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }
    if (this.props.profile.HomePhone !== undefined && this.props.profile.HomePhone !== '') {
      homephone = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={6} sm={6} md={3} lg={6}>
                <Typography>Home Phone:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
                {this.props.profile.HomePhone !== PRIVATE_INFO &&
                  !this.props.myProf && (
                    <a href={'tel:' + this.props.profile.HomePhone}>
                      <Typography className="linkColor">
                        {this.formatPhone(this.props.profile.HomePhone)}
                      </Typography>
                    </a>
                  )}
                {this.props.profile.HomePhone === PRIVATE_INFO && (
                  <Typography>Private as requested</Typography>
                )}
                {this.props.myProf && (
                  <Typography>{this.formatPhone(this.props.profile.HomePhone)}</Typography>
                )}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }
    if (this.props.profile.MobilePhone !== undefined && this.props.profile.MobilePhone !== '') {
      mobilephone = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={6} sm={6} md={3} lg={6}>
                <Typography>Mobile Phone:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
                {this.props.profile.MobilePhone !== PRIVATE_INFO && (
                  <a href={'tel:' + this.props.profile.MobilePhone}>
                    <Typography className="linkColor">
                      {this.formatPhone(this.props.profile.MobilePhone)}
                    </Typography>
                  </a>
                )}
                {this.props.profile.MobilePhone === PRIVATE_INFO && (
                  <Typography>Private as requested</Typography>
                )}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }
    if (this.props.myProf && this.props.profile.MobilePhone !== '') {
      mobilephone = (
        <div>
          <ListItem>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={6}>
                <Typography>Mobile Phone:</Typography>
              </Grid>
              <Grid item xs={3} justify="right">
                <Typography>{this.formatPhone(this.props.profile.MobilePhone)}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container justify="center" alignItems="center">
                  <Switch onClick={this.handleChangePrivacy} checked={!this.state.privacy} />
                  <Typography>{this.state.privacy ? 'Private' : 'Public'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    }
    if (String(this.props.profile.PersonType).includes('stu')) {
      if (String(this.props.profile.Minors).length !== 0) {
        minors = <Minors minors={this.props.profile.Minors} />;
      }

      majors = <Majors majors={this.props.profile.Majors} />;

      if (this.props.profile.OnOffCampus !== '') {
        residence = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={6} sm={6} md={3} lg={6}>
                  <Typography>On/Off Campus:</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
                  <Typography>{this.props.profile.OnOffCampus}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
    }
    if (String(this.props.profile.PersonType).includes('fac')) {
      if (this.props.profile.OnCampusDepartment !== '') {
        Department = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={6} sm={6} md={3} lg={6}>
                  <Typography>Department:</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
                  <Typography>{this.props.profile.OnCampusDepartment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
    }

    return (
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <CardHeader title="Personal Information" />
            {majors}
            {minors}
            {residence}
            {Department}
            {mobilephone}
            {homephone}
            {Home}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
