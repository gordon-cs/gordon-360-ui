import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import '../../app.css';
import './index.css';

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
    let OfficeHours, OfficePhone, Room, Office;
    if (String(this.props.profile.PersonType).includes('fac')) {
      if (
        this.props.profile.BuildingDescription === '' &&
        this.props.profile.OnCampusRoom === '' &&
        this.props.profile.OnCampusPhone === '' &&
        this.props.profile.office_hours === ''
      ) {
        return null;
      }

      if (this.props.profile.OnCampusPhone !== '') {
        // Gets the row item widths
        const rowItemOne = rowWidths.itemOne;
        const rowItemTwo = rowWidths.itemTwo;
        OfficePhone = (
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
        OfficeHours = (
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
        Room = (
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

      Office = (
        <Card className="office-list-card">
          <Grid container className="office-list-card-header">
            <CardHeader title="Office Information" />
          </Grid>
          <CardContent className="office-list-card-content">
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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {Office}
      </Grid>
    );
  }
}
