import React, { Component } from 'react';
import '../../app.css';
import './index.css';

import {
  Divider,
  ListItem,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
} from '@material-ui/core';

// A list of grid row lengths to align all content depending on the amount of items per row
const rowWidths = {
  marginRight: '0.8rem',
  itemOne: {
    xs: 5,
    sm: 5,
    md: 5,
    lg: 5,
  },
  itemTwo: {
    xs: 7,
    sm: 7,
    md: 7,
    lg: 7,
  },
};

// The style of the Grid items
const gridStyle = {
  item: {
    paddingRight: '0.8rem',
    hyphens: 'auto',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto',
    'word-break': 'break-word',
  },
  lastItem: {
    hyphens: 'auto',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto',
    'word-break': 'break-word',
  },
};

export default class Office extends Component {
  render() {
    let department, officeHours, officePhone, room, mailstop, Office;
    if (String(this.props.profile.PersonType).includes('fac')) {
      if (
        this.props.profile.BuildingDescription === '' &&
        this.props.profile.OnCampusRoom === '' &&
        this.props.profile.OnCampusPhone === '' &&
        this.props.profile.office_hours === ''
      ) {
        return null;
      }

      if (this.props.profile.OnCampusDepartment !== '') {
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        department = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Department:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography>{this.props.profile.OnCampusDepartment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.props.profile.OnCampusPhone !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        officePhone = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Office Phone:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <a href={'tel:978867' + this.props.profile.OnCampusPhone} className="number">
                    <Typography className="gc360-text-link">
                      {'(978) 867-' + this.props.profile.OnCampusPhone}
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.props.profile.office_hours !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        officeHours = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Office Hours:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography> {this.props.profile.office_hours}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.props.profile.BuildingDescription !== '' && this.props.profile.OnCampusRoom !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        room = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Room:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography>
                    {this.props.profile.BuildingDescription}, {this.props.profile.OnCampusRoom}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      if (this.props.profile.Mail_Location !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        mailstop = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid
                  container
                  xs={rowItemOne.xs}
                  sm={rowItemOne.sm}
                  md={rowItemOne.md}
                  lg={rowItemOne.lg}
                  style={gridStyle.item}
                  alignItems="center"
                >
                  <Typography>Mailstop:</Typography>
                </Grid>
                <Grid
                  container
                  xs={rowItemTwo.xs}
                  sm={rowItemTwo.sm}
                  md={rowItemTwo.md}
                  lg={rowItemTwo.lg}
                  style={gridStyle.lastItem}
                  alignItems="center"
                >
                  <Typography>{this.props.profile.Mail_Location}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }

      Office = (
        <Card className="office-list-card">
          <Grid container className="office-list-card-header">
            <CardHeader title="Office Information" />
          </Grid>
          <CardContent className="office-list-card-content">
            <List>
              {department}
              {room}
              {mailstop}
              {officePhone}
              {officeHours}
            </List>
          </CardContent>
        </Card>
      );
    }

    // Prevents a space from showing for an empty Office card
    if (String(this.props.profile.PersonType).includes('fac')) {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {Office}
        </Grid>
      );
    } else {
      return <></>;
    }
  }
}
