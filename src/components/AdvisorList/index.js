import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Advisors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let content;
    let advisorPrefix;
    // Gets the row item widths
    let rowWidths = this.props.rowWidths.twoItems;
    const rowItemOne = rowWidths.itemOne;
    const rowItemTwo = rowWidths.itemTwo;

    // Creates the list item's content
    if (this.props.advisors) {
      // Gets the last item of the list
      let lastItem = this.props.advisors[this.props.advisors.length - 1];

      // If there are multiple advisors, each advisor name will have a comma after it except for the
      // very last. If there's only one advisor, no comma will appear
      let advisorText = '';

      this.props.advisors.forEach((advisor) => {
        // NOTE: The difference between the two statements that adds text to the variable
        // "advisorText" is that one of them adds BOTH a comma and a space
        advisor === lastItem
          ? (advisorText += `${advisor.Firstname + ' ' + advisor.Lastname}`)
          : (advisorText += `${advisor.Firstname + ' ' + advisor.Lastname}, `);
      });
      content = <Typography>{advisorText}</Typography>;

      if (this.props.advisors.length === 0) {
        advisorPrefix = (
          <div>
            <Typography>Advisor:</Typography>
          </div>
        );
        content = (
          <div>
            <Typography>(not assigned)</Typography>
          </div>
        );
      } else if (this.props.advisors.length === 1) {
        advisorPrefix = (
          <div>
            <Typography>Advisor:</Typography>
          </div>
        );
      } else if (this.props.advisors.length > 1) {
        advisorPrefix = (
          <div>
            <Typography>Advisors:</Typography>
          </div>
        );
      }
    }
    // The advisors list is not available so the user sees an empty listing
    //  CODE TO WOORK ON IN THE FUTURE IF THE USER'S ADVISORS FAILED TO LOAD
    // advisorPrefix = (
    //   <div>
    //     <Typography>Advisor:</Typography>
    //   </div>
    // );

    if (this.props.advisors) {
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
                <Typography>{advisorPrefix}</Typography>
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
    } else {
      return <></>;
    }
  }
}
