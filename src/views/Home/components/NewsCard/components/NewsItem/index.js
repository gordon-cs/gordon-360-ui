// SUMMER 2020 NOTE:
// This file is currently not being used.
// Instead, the NewsItem.js file in the "News" view is being used
// This file is being preserved for now as the news features are still in development

// import { ListItem, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';
import { Card, CardContent, Typography, Collapse } from '@material-ui/core';

//Written by Jessica Guan

export default class GordonNewsItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = { open: false };
  }
  handleExpandClick() {
    this.setState({ open: !this.state.open });
    this.props.onClick();
  }
  render() {
    const { subject, submittedBy, description } = this.props;
    return (
      <Card onClick={this.handleExpandClick} className={styles.news-item}>
        <CardContent>
          <Typography variant="h6">{subject}</Typography>
          <Typography variant="subtitle2">{submittedBy}</Typography>
        </CardContent>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="overline">Description</Typography>
            <Typography variant="body1">{description}</Typography>
            {/* {content} */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
