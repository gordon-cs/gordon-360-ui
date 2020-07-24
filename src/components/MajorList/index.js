import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Majors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let content;
    let majorPrefix;
    // Gets the row item widths
    let rowWidths = this.props.rowWidths.twoItems;
    let rowItemOne = rowWidths.itemOne;
    let rowItemTwo = rowWidths.itemTwo;

    // Creates the list item's content
    if (this.props.majors) {
      // Gets the last item of the list
      let lastItem = this.props.majors[this.props.majors.length - 1];

      // If there are multiple majors, each major name will have a comma after it except for the
      // very last. If there's only one major, no comma will appear
      let majorText = '';

      this.props.majors.forEach(major => {
        // NOTE: The difference between the two statements that adds text to the variable
        // "majorText" is that one of them adds BOTH a comma and a space
        major === lastItem ? (majorText += `${major}`) : (majorText += `${major}, `);
      });
      content = <Typography>{majorText}</Typography>;
    }

    // Creates the list item's title
    if (this.props.majors.length === 1) {
      majorPrefix = (
        <div>
          <Typography>Major:</Typography>
        </div>
      );
    } else if (this.props.majors.length > 1) {
      majorPrefix = (
        <div>
          <Typography>Majors:</Typography>
        </div>
      );
    }

    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid
              container
              xs={rowItemOne.xs}
              sm={rowItemOne.sm}
              md={rowItemOne.md}
              lg={rowItemOne.lg}
              style={this.props.gridStyle.item}
              alignItems="center"
            >
              <Typography>{majorPrefix}</Typography>
            </Grid>
            <Grid
              container
              xs={rowItemTwo.xs}
              sm={rowItemTwo.sm}
              md={rowItemTwo.md}
              lg={rowItemTwo.lg}
              style={this.props.gridStyle.lastItem}
              alignItems="center"
            >
              {content}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}
