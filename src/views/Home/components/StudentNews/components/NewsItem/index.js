// import { ListItem, ListItemText } from 'material-ui/List';
import React, { Component } from 'react';
import { Card, CardContent, Typography, Collapse } from '@material-ui/core';
import '../../student-news.css';

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
    const { subject, submittedBy, description, dateSubmitted } = this.props;
    return (
      <Card onClick={this.handleExpandClick} className="news-item">
        <CardContent>
          <Typography variant="h6">{subject}</Typography>
          <Typography variant="subtitle2">
            {submittedBy} on {dateSubmitted}
          </Typography>
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
