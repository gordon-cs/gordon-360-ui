import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Minors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let content;
    let minorPrefix;
    // Gets the row item widths
    let rowWidths = this.props.rowWidths.twoItems;
    let rowItemOne = rowWidths.itemOne;
    let rowItemTwo = rowWidths.itemTwo;

    // Creates the list item's content
    if (this.props.minors) {
      // Gets the last item of the list
      let lastItem = this.props.minors[this.props.minors.length - 1];
      // If there are multiple minors, each minor name will have a comma after it except for the
      // very last. If there's only one minor, no comma will appear
      let minorText = '';

      this.props.minors.forEach((minor) => {
        // NOTE: The difference between the two statements that adds text to the variable
        // "majorText" is that one of them adds BOTH a comma and a space
        minor === lastItem ? (minorText += `${minor}`) : (minorText += `${minor}, `);
      });
      content = <Typography>{minorText}</Typography>;
    }

    // Creates the list item's title
    if (this.props.minors.length === 1) {
      minorPrefix = (
        <div>
          <Typography>Minor:</Typography>
        </div>
      );
    } else if (this.props.minors.length > 1) {
      minorPrefix = (
        <div>
          <Typography>Minors:</Typography>
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
              <Typography>{minorPrefix}</Typography>
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
